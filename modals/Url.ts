import mongoose, { Schema, model, models } from "mongoose";

export interface IUrl {
  _id?: mongoose.Types.ObjectId;
  url: string;
  shortUrl: string;
  click: number;
}

const urlSchema = new Schema<IUrl>(
  {
    url: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true, index: true },
    click: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const URL = models?.URL || model<IUrl>("URL", urlSchema);
export default URL;
