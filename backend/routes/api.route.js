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
    bookSchema.find()
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


router.route('/checkout-book').post((req, res, next) => {

  bookSchema.findOne({_id:req.body.book_id}).then((result) =>{
   const book = result;
    userSchema.findOneAndUpdate({uuid:req.body.uuid.toString()}, { $push: { checkouts: book } })
    .then((result1) =>{
      res.send(result1)
    })
    .catch((err) =>{
      console.log(err);
    })
    
     bookSchema.deleteOne({_id:req.body.book_id})
     .then((result) =>{
       console.log(result)
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