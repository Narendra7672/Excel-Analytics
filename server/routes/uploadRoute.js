// server/routes/uploadRoute.js
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import XLSX from 'xlsx';
import ExcelFile from '../models/ExcelFile.js'; // ✅ Use only one model
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload and Save Excel Data
router.post('/excel', verifyToken, upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = XLSX.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const newUpload = new ExcelFile({
      filename: file.originalname,
      data,
      user: req.user.id,
      uploadedAt: new Date()
    });

    await newUpload.save();
    fs.unlinkSync(file.path);

    res.status(200).json({ message: 'Excel file uploaded and saved', data });
  } catch (error) {
    res.status(500).json({ message: 'Error parsing Excel file', error: error.message });
  }
});

// Get Upload History
router.get('/history', verifyToken, async (req, res) => {
  try {
    const uploads = await ExcelFile.find({ user: req.user.id }).sort({ uploadedAt: -1 });
    res.status(200).json(uploads);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch upload history" });
  }
});

export default router;
