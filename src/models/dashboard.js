import { query } from "express";
import mongoose from "mongoose";

const dashboardSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  config: { type: Object, required: true },
  published: { type: Boolean, required: true },
  additionalConfig: { type: Object },
  createdBy: { type: String, required: true },
  createdOn: { type: Date, default: Date.now, required: true },
  updatedBy: { type: String, required: true },
  updatedOn: { type: Date, default: Date.now, required: true },
  projectId: { type: String, required: true },
});

export default mongoose.model("Dashboards", dashboardSchema);
