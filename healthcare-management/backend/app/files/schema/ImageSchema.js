import mongoose from "mongoose";

// Define the Image schema
const imageSchema = new mongoose.Schema({
    url: String,
    public_id: String,
    type: String,
    size: Number,
    uploaded_at: { type: Date, default: Date.now },
  });
  
// Create the Image model
export const Image = mongoose.model('Image', imageSchema);  