const httpStatus = require('http-status');
const mongoose = require('mongoose');
const {
  userRepo,
  todoRepo,
  categoryRepo,
  groupRepo,
} = require('../dbservices');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/tokenManagement');
const { abortIf } = require('../utils/responder');
const { userDTO } = require('../DTOs/user.dto');

class CustomerService {
  createTodo = async (data, user_id) => {
    const todoData = {
      ...data,
      user: user_id,
    };
    const todo = await todoRepo.create(todoData);
    const category = await categoryRepo.find({ _id: data.category });
    console.log(category);
    await category.todo.push(todo);
    await category.save();
    return todo;
  };

  createCategory = async (data, user_id) => {
    const categoryData = {
      ...data,
      user: user_id,
    };
    const todo = await categoryRepo.create(categoryData);
    return todo;
  };

  getTodos = async (user_id) => {
    const todo = await todoRepo.findAll({ user: user_id });
    return todo;
  };

  getCategories = async (user_id) => {
    const todo = await (await categoryRepo.findAll({ user: user_id }));
    return todo;
  };

  updateCategories = async (data, user_id, category_id) => {
    const category = await categoryRepo.update(data, {
      user: user_id,
      _id: category_id,
    });
    return category;
  };

  updateTodo = async (data, user_id, todo_id) => {
    console.log(String(todo_id));
    const category = await todoRepo.update(data, {
      user: user_id,
      _id: todo_id,
    });
    return category;
  };

  createGroup = async (data, user_id) => {
    const group = await groupRepo.create({
      ...data,
      creator: user_id,
      users: [user_id],
    });
    const user = await userRepo.findCustomer({ _id: user_id });
    user.groups.push(group._id);
    user.save();
    return group;
  };

  findAllGroups = async (user_id) => {
    const groups = await userRepo.findUsersGroups({ _id: user_id });
    return groups.groups;
  };

  getTodosFromCategory = async (category_id) => {
    const todos = await categoryRepo.find({ _id: category_id });
    return todos;
  };

  addUserToGroup = async (group_id, user_id) => {
    const group = await groupRepo.find({ _id: group_id });
    // if (!group.users.includes(user_id)) {
    console.log(group.users);
    var found = false;
    for (var item of group.users) {
      if (String(item._id) === user_id) {
        found = true;
        break;
      }
    }
    abortIf(found, httpStatus.BAD_REQUEST, 'User already exists in group');
    group.users.push(user_id);
    group.save();
    // }
    return group;
  };

  deleteTodo = async(id) => {
    const users = await todoRepo.delete({_id: id});
    return users;
  }

  searchUsers = async (query, email) => {
    const users = await userRepo.searchCustomerByEmail(query, email);
    return users;
  };
}

module.exports = {
  CustomerService,
};
