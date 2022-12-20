const { CustomerRepo } = require('./customer.table');
const { TodoRepo } = require('./todo.table');
const { CategoryRepo } = require('./category.table');
const { GroupRepo } = require('./group.table');

const userRepo = new CustomerRepo();
const todoRepo = new TodoRepo();
const categoryRepo = new CategoryRepo();
const groupRepo = new GroupRepo();

module.exports = {
  userRepo,
  todoRepo,
  categoryRepo,
  groupRepo,
};
