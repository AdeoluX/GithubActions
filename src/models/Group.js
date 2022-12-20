// models/user.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = require('./User');
const Todo = require('./Todo');

const GroupSchema = new Schema({
  group_name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now() },
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
