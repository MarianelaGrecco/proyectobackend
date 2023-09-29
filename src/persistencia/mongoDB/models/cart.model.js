import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const cartSchema = new Schema({
  products: {
    type: [
      {
        id_prod: {
          type: Schema.Types.ObjectId,
          ref: "products",
        },
        cant: {
          type: Number,
          default: 0,
        },
      },
    ],
    default: [],
  },

  cid: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toHexString(),
  },
});

const cartModel = model("cart", cartSchema);

export default cartModel;


