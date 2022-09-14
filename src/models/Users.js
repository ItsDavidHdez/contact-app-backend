import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  lastname: {
    type: String,
    require: false,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  user: {
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

userSchema.methods.matchPassword = async function (password) {
  const comparePass = await bcrypt.compare(password, this.password);
  return comparePass;
};

export default model("User", userSchema);
