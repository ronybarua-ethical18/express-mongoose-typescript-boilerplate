import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../utils/catchAsync";
import * as UserService from "../services/user.service";

export const setPassword = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.setPassword(req.body)
  res.status(httpStatus.CREATED).send({user:user, status:true});
});



