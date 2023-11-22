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
    _id:{
        type:Schema.Types.ObjectId
    }
  }, {
      collection: 'books'
    })


    module.exports = mongoose.model('Book', bookSchema)