import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  user: {
    type: String,
    required: true,
  },
});

export default mongoose.model("List", ListSchema);
