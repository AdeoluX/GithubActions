// const { options } = require('../../app');
const Category = require('../models/Category');

class CategoryRepo {
  create = async (data) => {
    const todo = await new Category(data).save();
    return todo;
  };

  find = async (condition) => {
    const todo = await Category.findOne(condition).populate('todo').exec();
    return todo;
  };

  findAll = async (condition) => {
    const todo = await Category.find(condition).sort({created_at: 'descending'}).populate('todo').exec();
    return todo;
  };

  update = async (new_values, condition) => {
    const todo = await Category.findOneAndUpdate(condition, new_values, {
      new: true,
    });
    return todo;
  };

  delete = async (condition) => {
    const todo = await Category.deleteOne(condition);
    return todo;
  };
}

module.exports = {
  CategoryRepo,
};
