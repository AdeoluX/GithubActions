// models/user.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
  },
  activated: { type: Boolean, default: false },
  phonenumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
