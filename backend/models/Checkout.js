const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import bookSchema from './Book'

let checkoutSchema = new Schema({
    book: {
      type: bookSchema
    },
    due_date:{
      type: Date
    },
  })

  module.exports = mongoose.model('Checkout', checkoutSchema)

