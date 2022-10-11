// import Joi from 'joi';
// import { NewCreatedUser } from '../interfaces/user.interface';

// const createUserBody: Record<keyof NewCreatedUser, any> = {
//   email: Joi.string().required().email(),
//   password: Joi.string().required(),
//   name: Joi.string().required(),
//   role: Joi.string().required().valid('user', 'admin'),
//   stores:Joi.string()
// };

// export const createUser = {
//   body: Joi.object().keys(createUserBody),
// };