const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  date: { type: String, required: true },
  author: [{ type: mongoose.Types.ObjectId, required: true, ref: 'user' }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('post', userSchema);