import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const usersSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "cart",
    },
    role: {
      type: String,
      default: "user",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    uid: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toHexString(),
    },

    documents: [
      {
        name: String,
        reference: String,
      },
    ],
    lastconnection: {
      type: Date,
    },
  },
  { timestamps: true }
);

const usersModel = model("Users", usersSchema);
export default usersModel;
