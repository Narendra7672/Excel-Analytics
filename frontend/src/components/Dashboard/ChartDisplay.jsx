import React, { useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

Chart.register(...registerables);

const ChartDisplay = ({ data }) => {
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const chartRef = useRef(null);

  if (!data || data.length === 0) return <p>No data available</p>;

  const headers = Object.keys(data[0]);

  const chartData = {
    labels: data.map((item) => item[xAxis]),
    datasets: [
      {
        label: `${yAxis} vs ${xAxis}`,
        data: data.map((item) => parseFloat(item[yAxis])),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const downloadPNG = () => {
    const canvas = chartRef.current?.canvas;
    if (!canvas) return;
    const imgData = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = imgData;
    a.download = "chart.png";
    a.click();
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(chartRef.current.canvas);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
    pdf.save("chart.pdf");
  };

  return (
    <div className="card p-4 shadow-sm mt-4">
      <h3 className="card-title mb-3">Chart Preview</h3>

      <div className="row mb-3">
        <div className="col">
          <select
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className="form-select"
          >
            <option value="">Select X-Axis</option>
            {headers.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <select
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
            className="form-select"
          >
            <option value="">Select Y-Axis</option>
            {headers.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
      </div>

      {xAxis && yAxis && (
        <>
          <div className="bg-white p-3 rounded shadow-sm">
            <Line data={chartData} ref={chartRef} />
          </div>

          <div className="d-flex gap-3 mt-3">
            <button onClick={downloadPNG} className="btn btn-outline-primary">
              Download PNG
            </button>
            <button onClick={downloadPDF} className="btn btn-outline-success">
              Download PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChartDisplay;
