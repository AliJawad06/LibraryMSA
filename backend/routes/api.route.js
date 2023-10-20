const { json } = require('body-parser');
let mongoose = require('mongoose');
  express = require('express'); 
  let bookSchema = require('../models/Book');
  let userSchema = require('../models/User')

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

  router.route('/get-user/:userId').get((req,res) =>{
    const userID = req.params.userID
    userSchema.find({_id: userID})
    bookSchema.find()
    .then((result) =>{
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

  console.log(JSON.stringify(req.body) + "this is reqbody")

  bookSchema.findOne({_id:req.body.book_id}).then((result) =>{
    const book = result[0]
    userSchema.findByIdAndUpdate({_id:req.body._id}, { $push: { checkouts: book } })
    .then((result) =>{
      console.log(result)
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