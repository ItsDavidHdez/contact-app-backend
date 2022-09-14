import mongoose, { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
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
    phone: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: false,
    },
    user: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Contact", contactSchema);
