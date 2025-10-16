import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/CorrectionForm.css";
import diwali from "../../assets/Images/diwali.jpg";

const CorrectionForm = ({ designer, client, deadline, taskId, onClose, onAssign }) => {
  const [points, setPoints] = useState("");
  const [type, setType] = useState("Image edit");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!points.trim()) {
      alert("Please enter correction points");
      return;
    }

    // Add correction
    onAssign(`${type}: ${points}`);

    // Close modal
    onClose();

    // Navigate to CorrectionDetails page for this task
    navigate(`/correction-details/${taskId}`);
  };

  return (
    <div className="form-overlay" onClick={onClose}>
      <div
        className="correction-form"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="form-title">Correction Form</h2>
        <div className="form-content">
          <div className="form-left">
            <img src={diwali} alt="Preview" className="form-image" />
            <label className="label">Correction Points</label>
            <textarea
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="Enter the correction points here..."
            />
          </div>

          <div className="form-right">
            <label>Uploaded By</label>
            <input type="text" value={designer} readOnly />
            <label>Client</label>
            <input type="text" value={client} readOnly />
            <label>Deadline</label>
            <input type="text" value={deadline} readOnly />
            <label>Correction Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option>Image edit</option>
              <option>Text change</option>
              <option>Color adjustment</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="form-footer">
          <button className="btn cancel text-white" onClick={onClose}>
            Cancel
          </button>
          <button className="btn submit" onClick={handleSubmit}>
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorrectionForm;
