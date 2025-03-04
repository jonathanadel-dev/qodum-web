import mongoose, { Document, Model } from "mongoose";

export interface ICategory extends Document {
  session: string;
  category_name: string;
  is_default?: boolean;
}

const CategorySchema = new mongoose.Schema<ICategory>(
  {
    session: { type: String, required: true },
    category_name: { type: String, required: true },
    is_default: { type: Boolean },
  },
  { timestamps: true }
);

const Category: Model<ICategory> =
  (mongoose.models.Category as Model<ICategory>) ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
