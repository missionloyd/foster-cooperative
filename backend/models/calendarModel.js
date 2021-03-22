const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  date: { type: String, required: true },
  event: { type: String, minlength=1, maxlength=500}
  

});

userSchema.plugin(uniqueValidator);
//
module.exports = mongoose.model('post', userSchema);