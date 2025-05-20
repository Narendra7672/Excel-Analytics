import React from "react";

const AxisSelector = ({ data = [], xAxis, yAxis, setXAxis, setYAxis }) => {
  // Extract column names from the first row of the data (assuming it's an array of objects)
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="flex gap-4 p-4">
      <div>
        <label className="block text-sm font-medium mb-1">X Axis</label>
        <select
          value={xAxis}
          onChange={(e) => setXAxis(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select X Axis</option>
          {columns.map((col, index) => (
            <option key={index} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Y Axis</label>
        <select
          value={yAxis}
          onChange={(e) => setYAxis(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Y Axis</option>
          {columns.map((col, index) => (
            <option key={index} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AxisSelector;
