import mongoose, { Document, Model } from "mongoose";

export interface IBoard extends Document {
  session: string;
  board: string;
  is_default?: boolean;
}

const BoardSchema = new mongoose.Schema<IBoard>(
  {
    session: { type: String, required: true },
    board: { type: String, required: true },
    is_default: { type: Boolean },
  },
  { timestamps: true }
);

const Board: Model<IBoard> =
  (mongoose.models.Board as Model<IBoard>) ||
  mongoose.model<IBoard>("Board", BoardSchema);

export default Board;
