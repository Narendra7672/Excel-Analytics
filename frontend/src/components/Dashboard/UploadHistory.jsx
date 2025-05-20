import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token'); // ✅ token defined here

      try {
        const res = await axios.get('http://localhost:5000/api/uploads/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(res.data);
      } catch (err) {
        console.error('Error fetching upload history:', err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Upload History</h2>
      <ul>
        {history.map((item, idx) => (
          <li key={idx}>
            <strong>{item.filename}</strong> - {new Date(item.uploadedAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadHistory;
