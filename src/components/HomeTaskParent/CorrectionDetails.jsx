import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/css/CorrectionDetails.css";

const CorrectionDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const task = {
    id: taskId,
    designer: "Nandhana",
    client: "Nike",
    deadline: "2025-10-20",
    corrections: [
      "Change background color",
      "Update banner text alignment",
      "Use correct font weight",
            "Use correct font weight",

    ],
  };

  return (
    <div className="correction-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2 className=" correctiontext">Correction Details (Task ID: {task.id})</h2>

      <div className="details-card">
        <p><b>Client:</b> {task.client}</p>
        <p><b>Designer:</b> {task.designer}</p>
        <p><b>Deadline:</b> {task.deadline}</p>
      </div>

      <div className="corrections-list">
        <h3 className=" correctiontext">Corrections</h3>
        <ul>
          {task.corrections.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CorrectionDetails;
