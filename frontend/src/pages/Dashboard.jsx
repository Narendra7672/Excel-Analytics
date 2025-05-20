import React, { useState } from "react";
import ExcelUpload from "../components/Dashboard/ExcelUpload";
import AxisSelector from "../components/Dashboard/AxisSelector";
import ChartDisplay from "../components/Dashboard/ChartDisplay";
import UploadHistory from "../components/Dashboard/UploadHistory";
import ThreeDChart from "../components/Dashboard/ThreeDChart"; // ✅ Make sure path is correct

const Dashboard = () => {
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [xAxis, setXAxis] = useState(""); // ✅ add this
  const [yAxis, setYAxis] = useState(""); // ✅ add this

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Welcome to Excel Analytics Platform</h2>

      <ExcelUpload setExcelData={setExcelData} setFileName={setFileName} />

      {excelData.length > 0 && (
        <>
          <AxisSelector
            data={excelData}
            xAxis={xAxis}
            yAxis={yAxis}
            setXAxis={setXAxis}
            setYAxis={setYAxis}
          />

          <ChartDisplay data={excelData} xAxis={xAxis} yAxis={yAxis} />

          {yAxis && (
            <ThreeDChart
              data={excelData.map((item) => ({
                value: parseFloat(item[yAxis])
              }))}
            />
          )}
        </>
      )}

      <UploadHistory />
    </div>
  );
};

export default Dashboard;
