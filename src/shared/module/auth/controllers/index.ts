import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../utils/catchAsync";
import AuthService from "../services/";
import * as TokenService from "../../../token/token.service";

const signup = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthService.signup(req.body);
  res.status(httpStatus.CREATED).send({ user: user, status: true });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  await AuthService.verifyEmail(req.query["token"]);
  res.status(httpStatus.CREATED).send({
    status: true,
    message: "Your email verification is successfully done",
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthService.login(req.body);
  const tokens = await TokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user: user, status: true, tokens });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const resetPasswordToken = await TokenService.generateResetPasswordToken(
    req.body.email
  );
  res.status(httpStatus.CREATED).send(resetPasswordToken);
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.resetPassword(req.query["token"], req.body.password);
  res
    .status(httpStatus.CREATED)
    .send({ status: true, message: "Your password has set successfully" });
});

const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const userWithTokens = await AuthService.refreshAuth(req.body.refreshToken);
  res.send({ ...userWithTokens });
});

export default {
  signup,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshTokens,
};
