const express = require('express');
const { signUpValidate } = require('../validations/user.validations');
const {
  getAllProviders,
  activateProvider,
  getProvider,
  createLearninType,
  getLearninTypes,
} = require('../controller/admin.controller');
const { verifyAdmin } = require('../middleware/verifyToken');
const app = require('../../app');
const router = express.Router();

router.use(verifyAdmin);
// providers
router.get('/get-all-providers', getAllProviders); //must have filters
router.get('/get-provider/:provider_id', getProvider);
router.put('/activate-deactivate-provider/:provider_id', activateProvider);

// learnin
router.post('/create-content');
router.put('/approve-disapprove-content/:learnin_id');
router.put('/reorder-content/:learnin_id');
router.get('/get-all-content'); //must have filters
router.get('/get-content/:learnin_id');
router.delete('/delete-content/:learnin_id');
router.put('/update-content/:learnin_id');

//customers
router.get('/get-subcribed-users/:learnin_id');

//posts
router.get('/get-all-posts/:learnin_id');
router.put('/approve-post/:post_id');

//learnintype
router.get('/get-all-learning-types', getLearninTypes);
router.post('/create-learningtype', createLearninType);

module.exports = router;
