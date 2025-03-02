import { query } from "express";
import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  public: { type: Boolean, required: true },
  authorisationRoles: { type: Array, required: true },
  additionalConfig: { type: Object },
  createdBy: { type: String, required: true },
  createdOn: { type: Date, default: Date.now, required: true },
  updatedBy: { type: String, required: true },
  updatedOn: { type: Date, default: Date.now, required: true },
});

export default mongoose.model("Projects", userSchema);
