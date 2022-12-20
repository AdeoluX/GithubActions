// const catchAsync = require('../utils/catchAsync');
const catchAsync = require('../utils/catchAsync');
const { CustomerService } = require('../services');
const {
  successResponse,
  abortIf,
  redirect,
  download,
  downloadPdfFile,
  downloadFile,
} = require('../utils/responder');
const { paginate, paginateOptions } = require('../utils/paginate');

const customerService = new CustomerService();

const createTodo = catchAsync(async (req, res, next) => {
  const todo = await customerService.createTodo(req.body, req.user_id);
  return successResponse(req, res, todo);
});

const createCategory = catchAsync(async (req, res, next) => {
  const todo = await customerService.createCategory(req.body, req.user_id);
  return successResponse(req, res, todo);
});

const getAllTodos = catchAsync(async (req, res, next) => {
  const todos = await customerService.getTodos(req.user_id);
  return successResponse(req, res, todos);
});

const getAllCategories = catchAsync(async (req, res, next) => {
  const todos = await customerService.getCategories(req.user_id);
  return successResponse(req, res, todos);
});

const updateCategory = catchAsync(async (req, res, next) => {
  const todos = await customerService.updateCategories(
    req.body,
    req.user_id,
    req.params.category_id
  );
  return successResponse(req, res, todos);
});

const updateTodo = catchAsync(async (req, res, next) => {
  const todos = await customerService.updateTodo(
    req.body,
    req.user_id,
    req.params.todo_id
  );
  return successResponse(req, res, todos);
});

const createGroup = catchAsync(async (req, res, next) => {
  const todos = await customerService.createGroup(req.body, req.user_id);
  return successResponse(req, res, todos);
});

const addUserToGroup = catchAsync(async (req, res, next) => {
  const todos = await customerService.addUserToGroup(
    req.params.group_id,
    req.body.user_id
  );
  return successResponse(req, res, todos);
});

const getAllGroups = catchAsync(async (req, res, next) => {
  const todos = await customerService.findAllGroups(req.user_id);
  return successResponse(req, res, todos);
});

const getTodosFromCategory = catchAsync(async (req, res, next) => {
  const todos = await customerService.getTodosFromCategory(
    req.params.category_id
  );
  return successResponse(req, res, todos);
});

const filterUsers = catchAsync(async (req, res, next) => {
  const todos = await customerService.searchUsers(req.query.email, req.email);
  return successResponse(req, res, todos);
});

const deleteTodo = catchAsync(async (req, res, next) => {
  const todos = await customerService.deleteTodo(req.params.id);
  return successResponse(req, res, todos);
});

module.exports = {
  createTodo,
  createCategory,
  getAllTodos,
  getAllCategories,
  updateTodo,
  updateCategory,
  createGroup,
  addUserToGroup,
  filterUsers,
  getAllGroups,
  getTodosFromCategory,
  deleteTodo
};
