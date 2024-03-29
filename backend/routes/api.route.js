const { json } = require('body-parser');
let mongoose = require('mongoose');
  express = require('express'); 
  let bookSchema = require('../models/Book');
  let userSchema = require('../models/User')
  let checkoutSchema = require('../models/Checkout')
  router = express.Router()
  


  

  router.route('/add-book').post((req, res, next) => {
    bookSchema.create(req.body)
    .then((result) =>{
      res.send(result)
    })
    .catch((err) =>{
      console.log(err);
    })
})

  router.route('/get-books').get((req,res) =>{
    
    bookSchema.find({checkedOut: false})
    .then((result) =>{
      res.send(result)
    })
    .catch((err) =>{
      console.log(err);
    })
    

    
  })

  router.route('/get-all-checkouts').get((req,res) =>{
    userSchema.find({
      $expr: {
        $gt: [{$size: "$checkouts"},0]
      }
    }
    )
    .then((result) =>{
      res.send(result)
    })
    .catch((err)=>{
      console.log(err)
    })

  })

  router.route('/user/:userId').get((req,res) =>{
    
    
    const userId = req.params.userId
    userSchema.findOne({uuid: userId})
    .then((result) =>{
      
      console.log(JSON.stringify(result) + "this is the user data")
      res.send(result)
    })
    .catch((err) =>{
      console.log(err);
    })
    
  })

  router.route('/add-user').post((req, res, next) => {
    userSchema.create(req.body)
    .then((result) =>{
      res.send(result)
    })
    .catch((err) =>{
      console.log(err);
    })
})


router.route('/change-status').post((req,res,next) =>{
  userSchema.findOneAndUpdate(
    {
      name: req.body.name.toString(),
      'checkouts._id': req.body.checkout_id  // assuming checkoutIdToUpdate is the ID of the checkout you want to update
    },
    {
      $set: {
        'checkouts.$.status': true,
         'checkouts.$.due_date': req.body.due_date 
      }
    }
  ).then((result1) =>{
    res.send(result1)
  })
  .catch((err) =>{
    console.log(err);
  });
});


router.route('/delete-checkout').post((req,res,next) =>{
  userSchema.findOneAndUpdate(
    {
      name: req.body.name.toString(),
      'checkouts._id': req.body.checkout_id,
      'checkouts.status': true
    },
    {
      $pull: {
        checkouts: { _id: req.body.checkout_id }
      }
    }
  ).then((result1) =>{
    bookSchema.findOneAndUpdate({_id:req.body.book_id}, {checkedOut:false})
     .then((result) =>{
       console.log(result + "this is the book result")
     })
     .catch((err) =>{
       console.log(err);
     })
  })
  .catch((err) =>{
    console.log(err);
  });
});

router.route('/getUserCheckoutsSize/:userId').get(  (req, res) => {
  const userId = req.params.userId;

  // Find the user by their ID using promises
  userSchema.findOne({uuid: userId})
      .then(user => {
          if (!user) {
              return res.status(404).json({ message: 'User not found' });
          }

          // Get the size of the checkouts array
          console.log(user + "this is the user in backend")
          const checkoutsSize = user.checkouts.length;
         console.log(checkoutsSize + "this is checkouts size")
          res.send({checkoutsSize: checkoutsSize});
      })
      .catch(error => {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
      });
});

router.route('/checkout-book').post((req, res, next) => {

  bookSchema.findOne({_id:req.body.book_id}).then((result) =>{
   
    const checkout = {
    book: result,
    due_date: "N/A", 
    status: false
   };

    userSchema.findOneAndUpdate({uuid:req.body.uuid.toString()}, { $push: { checkouts: checkout } })
    .then((result1) =>{
      res.send(result1)
    })
    .catch((err) =>{
      console.log(err);
    })
    
     bookSchema.findOneAndUpdate({_id:req.body.book_id}, {checkedOut:true})
     .then((result) =>{
       console.log(result + "this is the book result")
     })
     .catch((err) =>{
       console.log(err);
     })
   })
   .catch((err) =>{
     console.log(err);
   })

})

module.exports = router