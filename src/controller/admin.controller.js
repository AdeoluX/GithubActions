// const catchAsync = require('../utils/catchAsync');
const catchAsync = require('../utils/catchAsync');
const { AdminService } = require('../services');
const {
  successResponse,
  abortIf,
  redirect,
  download,
  downloadPdfFile,
  downloadFile,
} = require('../utils/responder');
const { paginate, paginateOptions } = require('../utils/paginate');

const adminService = new AdminService();

const getAllProviders = catchAsync(async (req, res, next) => {
  const paginate = paginateOptions(req);
  console.log(paginate);
  // if (env === 'test') {
  //   return successResponse(req, res, providers);
  // }
  const providers = await adminService.getAllProviders(paginate);

  return successResponse(req, res, providers);
});

const activateProvider = catchAsync(async (req, res, next) => {
  const provider = await adminService.activateDeactivateProvider(
    req.params.provider_id,
    req.query.status
  );
  return successResponse(req, res, provider);
});

const getProvider = catchAsync(async (req, res, next) => {
  const provider = await adminService.getProvider(req.params.provider_id);
  return successResponse(req, res, provider);
});

const createLearninType = catchAsync(async (req, res, next) => {
  const learninType = await adminService.createLearninTypes(req.body);
  return successResponse(req, res, learninType);
});

const getLearninTypes = catchAsync(async (req, res, next) => {
  const learninType = await adminService.getLearninTypes();
  return successResponse(req, res, learninType);
});

module.exports = {
  activateProvider,
  getAllProviders,
  getProvider,
  createLearninType,
  getLearninTypes,
};
