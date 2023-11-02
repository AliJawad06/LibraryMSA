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
    _id:{
        type:Schema.Types.ObjectId
    }
  });

let checkoutSchema = new Schema({
    book: {
      type: bookSchema1
    }
  })

  module.exports = mongoose.model('Checkout', checkoutSchema)

