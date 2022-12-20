// const { options } = require('../../app');
const Group = require('../models/Group');

class GroupRepo {
  create = async (data) => {
    const todo = await (
      await new Group(data).save()
    ).populate({
      path: 'creator',
      model: 'User',
      select: 'firstname lastname',
    });
    return todo;
  };

  find = async (condition) => {
    const todo = await Group.findOne(condition).populate('users').exec();
    return todo;
  };

  findAll = async (condition) => {
    const todo = await Group.find(condition).populate('todo').exec();
    return todo;
  };

  update = async (new_values, condition) => {
    const todo = await Group.findOneAndUpdate(condition, new_values, {
      new: true,
    });
    return todo;
  };

  delete = async (condition) => {
    const todo = await Group.deleteOne(condition);
    return todo;
  };
}

module.exports = {
  GroupRepo,
};
