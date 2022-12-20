// models/user.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = require('./User');
const Todo = require('./Todo');

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  todo: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
  created_at: { type: Date, default: Date.now() },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
