import Joi from 'joi';
import { NewCreatedUser } from './user.interface';

const createUserBody: Record<keyof NewCreatedUser, any> = {
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  role: Joi.string().required().valid('user', 'admin'),
};

export const createUser = {
  body: Joi.object().keys(createUserBody),
};