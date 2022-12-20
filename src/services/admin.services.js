const httpStatus = require('http-status');
const { userRepo, providerRepo, learninTypeRepo } = require('../dbservices');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/tokenManagement');
const { abortIf } = require('../utils/responder');
const { userDTO } = require('../DTOs/user.dto');

class AdminService {
  getAllProviders = async (paginate) => {
    const providers = await providerRepo.findProviders(paginate);
    return providers;
  };

  activateDeactivateProvider = async (provider_id, status) => {
    const provider = await providerRepo.findProviderById(provider_id);
    abortIf(!provider, httpStatus.BAD_REQUEST, 'provider does not exist');
    const activate_deactivate = await providerRepo.updateProvider(
      { provider_id },
      { status },
      true
    );
    return activate_deactivate;
  };

  getProvider = async (provider_id) => {
    const provider = await providerRepo.findProviderByIdIncludeOptions(
      provider_id
    );
    abortIf(!provider, httpStatus.NOT_FOUND, 'provider does not exist');
    return provider;
  };

  createLearninTypes = async (data) => {
    const learninType = await learninTypeRepo.createType(data);
    return learninType;
  };

  getLearninTypes = async () => {
    const learninType = await learninTypeRepo.findAllLearninType();
    return learninType;
  };
}

module.exports = {
  AdminService,
};
