import httpStatus from "http-status";
import { IUserInfo, NewCreatedUser } from "../interfaces/user.interface";
import { ApiError } from "../../../errors";
import UserModel from "../models/user.model";
import sendEmail from "../../../services/mail/sentMail";
import * as TokenService from "../../../token/token.service";
import { VERIFY_EMAIL_TEMPLATE } from "../../../services/mail/constants";

/**
 * @param {NewCreatedUser} userBody
 * @returns {Promise<IUserInfo>}
 */

export const signup = async (userBody: NewCreatedUser): Promise<IUserInfo> => {
  const isUniqueEmail = await UserModel.isEmailTaken(userBody.email);

  //checking the email is already exist or not
  if (isUniqueEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  const user = await UserModel.create(userBody);
  const token = await TokenService.generateVerifyEmailToken(user);
  sendEmail(
    [user.email],
    {
      subject: "Verify Email",
      data: {
        name: user.name,
        role: user.role,
        token: process.env["CLIENT_PORT"] + "/set-password" + token,
      },
    },
    VERIFY_EMAIL_TEMPLATE
  );
  return user;
};
