import * as Joi from 'joi';

export default {
  PORT: Joi.number().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASS: Joi.string().required(),
};