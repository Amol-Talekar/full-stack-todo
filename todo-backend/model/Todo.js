import mongoose from "mongoose";

const { Schema } = mongoose;

const TodoSchema = new Schema({
  id: { unique: true, required: true, type: String },
  title: { type: String },
  isDone: { type: Boolean, default: false },
});

export default mongoose.model("todos", TodoSchema);
