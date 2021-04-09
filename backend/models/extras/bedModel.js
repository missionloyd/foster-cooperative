const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//calendar model here refers to each individual calendar event
const Schema = mongoose.Schema;

const postSchema = new Schema({
  date: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
  numBeds: {type: int, required:true}
  

});

userSchema.plugin(uniqueValidator);
//
module.exports = mongoose.model('post', userSchema);