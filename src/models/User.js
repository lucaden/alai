import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
