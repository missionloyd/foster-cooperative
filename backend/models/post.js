const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  date: { type: String, required: true },
  content: { type: String, required: true, minlength=1, maxlength=2000},
  like: {type:String, required: true},
  comment: {type: String, required=true, minlength = 1, maxlength = 1000},
  author: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
  //add image path ask how
  //for accessibility reasons i think its a good idea to have alt text for every image
  imageAltText: {type: String, required: false, minlength =1, maxlength = 100}
});

userSchema.plugin(uniqueValidator);
//
module.exports = mongoose.model('post', userSchema);
