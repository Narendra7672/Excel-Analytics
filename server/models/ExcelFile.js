// models/ExcelFile.js
import mongoose from 'mongoose';

const ExcelFileSchema = new mongoose.Schema({
  filename: String,
  data: Array,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('ExcelFile', ExcelFileSchema);
