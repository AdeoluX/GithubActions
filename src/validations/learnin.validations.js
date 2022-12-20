const Joi = require('joi');
// import { join } from 'path/posix';

const createLearnin = {
  body: Joi.object().keys({
    provider_id: Joi.string().uuid().required(),
    parent_k: Joi.string().uuid().optional(),
    index: Joi.string().uuid().optional,
    description: Joi.string().required(),
    learnin_type: Joi.string().required(),
    content: Joi.string().optional(),
  }),
};

module.exports = {
  createLearnin,
};
