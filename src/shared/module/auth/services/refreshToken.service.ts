import httpStatus from "http-status";
import {
  IUserWithTokens,
} from "../interfaces/user.interface";
import { ApiError } from "../../../errors";
import * as TokenService from "../../../token/token.service";
import mongoose from "mongoose";
import tokenTypes from "../../../token/token.types";
import { getUserById } from ".";

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<IUserWithTokens>}
 */
 export const refreshAuth = async (
    refreshToken: string
  ): Promise<IUserWithTokens> => {
    try {
      const refreshTokenDoc = await TokenService.verifyToken(
        refreshToken,
        tokenTypes.REFRESH
      );
      const user = await getUserById(
        new mongoose.Types.ObjectId(refreshTokenDoc.user)
      );
      if (!user) {
        throw new Error();
      }
      await refreshTokenDoc.remove();
      const tokens = await TokenService.generateAuthTokens(user);
      return { user, tokens };
    } catch (error) {
      console.log(error);
      throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
    }
  };