// server/models/ExcelData.js
import mongoose from "mongoose";

const excelRowSchema = new mongoose.Schema({}, { strict: false });

const ExcelDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  data: [excelRowSchema], // stores array of rows from Excel file
});

export default mongoose.model("ExcelData", ExcelDataSchema);
