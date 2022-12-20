// var mongoose = require('mongoose');
const mongoose = require('mongoose');
const { compare_passwords } = require('../utils/passwordHash');
const { password, username } = require('./keys');

// const { db_password, db_username } = values;

// console.log(db_password, db_username);
// mongodb+srv://checklist:<password>@cluster0.bq6yy6k.mongodb.net/?retryWrites=true&w=majority
const mongo = mongoose
  .connect(
    `mongodb+srv://checklist:${password}@cluster0.bq6yy6k.mongodb.net/?retryWrites=true&w=majority`,
    // `mongodb+srv://${username}:${password}@cluster0.bq6yy6k.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((con) => console.log('DB connected Dont lose focus!'));

module.exports = mongo;
