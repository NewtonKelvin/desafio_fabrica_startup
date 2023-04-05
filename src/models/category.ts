import mongoose, {
  InsertManyOptions,
  MongooseDocumentMiddleware,
  MongooseError,
  Schema,
} from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
