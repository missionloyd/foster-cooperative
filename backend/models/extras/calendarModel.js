const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//calendar model here refers to each individual calendar event
const Schema = mongoose.Schema;

const postSchema = new Schema({
  date: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
  eventType: { type: mongoose.Types.ObjectId, required: true},
  eventName: { type: String, minlength=1, maxlength=500}
  

});

userSchema.plugin(uniqueValidator);
//
module.exports = mongoose.model('post', userSchema);