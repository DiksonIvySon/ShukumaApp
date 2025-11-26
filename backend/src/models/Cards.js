import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  title: String,
  description: String,
  steps: [String],
  level: String,
  duration: String,
  category: String,
  image: String,
  video: String
});

export default mongoose.model("Card", CardSchema);
