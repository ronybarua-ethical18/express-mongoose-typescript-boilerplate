import { IUserInfo } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import mongoose from "mongoose";
import { signup } from "./signup.service";
import { login } from "./login.service";
import { resetPassword } from "./reset-password.service";
import { verifyEmail } from "./verifyEmail.service";
import { refreshAuth } from "./refreshToken.service";

/**
 * Get user by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserInfo | null>}
 */

export const getUserById = async (
  id: mongoose.Types.ObjectId
): Promise<IUserInfo | null> => UserModel.findById(id);

export default {
  signup,
  login,
  resetPassword,
  verifyEmail,
  refreshAuth,
};
