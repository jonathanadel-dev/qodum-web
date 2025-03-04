import mongoose, { Document, Model } from "mongoose";

export interface IStream extends Document {
  session: string;
  stream_name: string;
}

const StreamSchema = new mongoose.Schema<IStream>(
  {
    session: { type: String, required: true },
    stream_name: { type: String, required: true },
  },
  { timestamps: true }
);

const Stream: Model<IStream> =
  (mongoose.models.Stream as Model<IStream>) ||
  mongoose.model<IStream>("Stream", StreamSchema);

export default Stream;
