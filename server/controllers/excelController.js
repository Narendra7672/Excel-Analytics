const XLSX = require('xlsx');
const ExcelData = require('../models/ExcelData');

const parseExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

    // Read the buffer
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    // Save to MongoDB
    const savedData = await ExcelData.create({ data });

    res.status(200).json({
      msg: 'Excel uploaded and parsed successfully',
      records: data.length,
      savedData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to parse Excel file' });
  }
};

module.exports = { parseExcel };
