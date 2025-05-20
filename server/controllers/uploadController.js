import XLSX from 'xlsx';

export const handleExcelUpload = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read file buffer from multer
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });

    // Assuming first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Respond with parsed data or save to DB here
    return res.status(200).json({ message: 'File uploaded successfully', data });
  } catch (error) {
    console.error('Excel upload error:', error);
    return res.status(500).json({ error: 'Failed to process Excel file' });
  }
};
