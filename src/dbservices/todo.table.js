const Todo = require('../models/Todo');

class TodoRepo {
  create = async (data) => {
    const todo = await new Todo(data).save();
    return todo;
  };

  find = async (condition) => {
    const todo = await Todo.findOne(condition).populate('category');
    return todo;
  };

  findAll = async (condition) => {
    const todo = await Todo.find(condition).populate('category');
    return todo;
  };

  update = async (new_values, condition) => {
    const todo = await Todo.findByIdAndUpdate(condition, new_values, {
      new: true,
    });
    return todo;
  };

  delete = async (condition) => {
    const todo = await Todo.deleteOne(condition);
    return todo;
  };
}

module.exports = {
  TodoRepo,
};
