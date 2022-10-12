import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import tokenTypes from "../../../token/token.types";
import config from "../../../../config/config";
import UserModel from "../../auth/models/user.model";
import { IPayload } from "../../../token/token.interface";

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: IPayload, done) => {
    try {
      if (payload.type !== tokenTypes.ACCESS) {
        throw new Error("Invalid token type");
      }
      const user = await UserModel.findById(payload.sub);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

export default jwtStrategy;
