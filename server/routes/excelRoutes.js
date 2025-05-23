const express = require('express');
const router = express.Router();
const multer = require('multer');
const { parseExcel } = require('../controllers/excelController');

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), parseExcel);

module.exports = router;
