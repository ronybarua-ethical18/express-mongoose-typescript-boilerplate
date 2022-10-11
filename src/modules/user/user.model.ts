import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { IUserInfo, IUserModel } from "./user.interface";
import { roles } from "./user.role";

const userSchema = new mongoose.Schema<IUserInfo, IUserModel>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: roles,
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

/**
 * check if email is taken
 @param {string} email-the user's email
 @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 @param {Promise<boolean>} 
 */

userSchema.static(
  "isEmailTaken",
  async function (
    email: string,
    excludeUserId: mongoose.ObjectId
  ): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  }
);

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.method(
  "isPasswordMatch",
  async function (password: string): Promise<boolean> {
    const user = this;
    return bcrypt.compare(password, user.password);
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<IUserInfo, IUserModel>("User", userSchema);

export default User;
