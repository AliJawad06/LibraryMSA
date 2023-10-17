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
      next(err);
    })
})

  router.route('/get-books').get((req,res) =>{
    bookSchema.find()
    .then((result) =>{
      res.send(result)
    })
    .catch((err) =>{
      next(err);
    })
    
  })

  router.route('/get-user/:userId').get((req,res) =>{
    const userID = req.params.userID
    userSchema.find({uuid: userID})
    bookSchema.find()
    .then((result) =>{
      res.send(result)
    })
    .catch((err) =>{
      next(err);
    })
    
  })

  router.route('/add-user').post((req, res, next) => {
    userSchema.create(req.body)
    .then((result) =>{
      res.send(result)
    })
    .catch((err) =>{
      next(err);
    })
})


router.route('/checkout-book').post((req, res, next) => {
  console.log(JSON.stringify(req.body) + "this is req.body")
})

 

module.exports = router