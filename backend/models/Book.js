const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let bookSchema = new Schema({
    title: {
      type: String
    },
    author: {
      type: String
    },
    due_length:{
        type: Number
    },
    description: {
      type: String
    }
  }, {
      collection: 'books'
    })


    module.exports = mongoose.model('Book', bookSchema)