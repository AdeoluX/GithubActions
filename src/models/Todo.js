// models/user.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = require('./User');
const Category = require('./Category');

const TodoSchema = new Schema({
  todo: { type: String },
  description: { type: String },
  image: { type: String },
  status: { type: Boolean, default: false },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
