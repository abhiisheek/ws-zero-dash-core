import e, { query } from "express";
import mongoose from "mongoose";

const visualSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  config: { type: Object, required: true },
  createdBy: { type: String, required: true },
  createdOn: { type: Date, default: Date.now, required: true },
  updatedBy: { type: String, required: true },
  updatedOn: { type: Date, default: Date.now, required: true },
  datasource: {
    dsType: { type: String, required: true, enum: ["REST", "DB"] },
    db: { type: Object },
    restApi: { type: Object },
  },
});

export default mongoose.model("Visuals", userSchema);
