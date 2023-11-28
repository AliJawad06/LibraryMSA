const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let bookSchema1 = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  due_length:{
      type: Number
  }, 
  description:{
    type: String
  }
  });

let checkoutSchema = new Schema({
    book: {
      type: bookSchema1
    }, 
    due_date:{
      type: String
    }, 
    status: {
      type: Boolean
    }
  })

  //86400000

let userSchema = new Schema({
    uuid: {
      type: String
    },
    name: {
      type: String
    },
    email:{
      type: String
    },
    checkouts:{
        type: [checkoutSchema]
    }
  }, {
      collection: 'users'
    })

    module.exports = mongoose.model('User', userSchema)
