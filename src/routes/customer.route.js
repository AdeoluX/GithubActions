const express = require('express');
const { verify } = require('../middleware/verifyToken');
const { signUpValidate } = require('../validations/user.validations');
const {
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
} = require('../controller/user.controller');

const router = express.Router();

router.use(verify);

// learning
router.post('/create-todo', createTodo);

router.post('/create-category', createCategory);

router.get('/get-all-todos', getAllTodos);

router.get('/get-todos-for-category/:category_id', getTodosFromCategory);

router.get('/get-all-groups', getAllGroups);

router.get('/get-all-categories', getAllCategories);

router.patch('/update-todo/:todo_id', updateTodo);

router.patch('/update-category/:category_id', updateCategory);

//create group
router.post('/create-group', createGroup);
//add user to group
router.post('/add-user/:group_id', addUserToGroup);
//get user filter user
router.get('/search', filterUsers);
router.delete('/delete-todo/:id', deleteTodo);

module.exports = router;
