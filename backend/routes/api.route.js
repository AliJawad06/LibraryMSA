const { json } = require('body-parser');
let mongoose = require('mongoose');
  express = require('express'); 
  let bookSchema = require('../models/Book');

  router = express.Router()
    

  router.route('/add-book').post((req, res, next) => {
    bookSchema.create(req.body)
    .then((result) =>{
      console.log(result)
      res.send(result)
    })
    .catch((err) =>{
      next(err);
    })
})

  router.route('/get-books').get((req,res) =>{
    bookSchema.find()
    .then((result) =>{
      console.log(result)
      res.send(result)
    })
    .catch((err) =>{
      next(err);
    })
    
  })

module.exports = router