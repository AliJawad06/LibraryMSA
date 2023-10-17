const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import checkoutSchema from './Checkout'

let userSchema = new Schema({
    uuid: {
      type: Schema.Types.UUID
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

