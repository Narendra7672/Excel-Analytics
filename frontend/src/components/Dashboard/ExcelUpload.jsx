import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const ExcelUpload = ({ setExcelData, setFileName }) => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const handleFile = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const parsedData = XLSX.utils.sheet_to_json(ws);
      setData(parsedData);
      setExcelData(parsedData);
    };
    reader.readAsBinaryString(selectedFile);
  };

  const uploadFile = async () => {
    if (!file) return alert("Please choose a file first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/upload", formData);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed.");
    }
  };

  return (
    <div className="card p-3 shadow-sm">
      <h3 className="card-title mb-3">Upload Excel File</h3>
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} className="form-control mb-3" />
      <button onClick={uploadFile} className="btn btn-primary w-100">Upload</button>
    </div>
  );
};

export default ExcelUpload;
