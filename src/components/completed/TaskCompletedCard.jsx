import React, { useState } from "react";
import "../../assets/css/TaskCompletedCard.css";
import diwali from "../../assets/Images/diwali.jpg";
import CorrectionForm from "./CorrectionForm";

const TaskCompletedCard = ({ task, onAssignCorrection }) => {
  const [showForm, setShowForm] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const handleCorrection = () => setShowForm(true);
  const handleRejected = () =>
    alert(`Task for client ${task.client} has been REJECTED and sent back.`);
  const handleApproved = () =>
    alert(`Task for client ${task.client} has been APPROVED.`);

  return (
    
    <>
      <div className="task-card">
        <img
          src={diwali}
          alt="task"
          className="task-image"
          onClick={() => setShowImage(true)}
        />

        <div className="task-info">
          <div className="uploaded">
            <p className="task-upload">
              <b>Uploaded By</b>
            </p>
            <div className="task-designer">
              <div className="designer-icon">
                <i className="bi bi-person-circle"></i>
              </div>
              <div className="text-start">
                <p className="designer-name">{task.designer}</p>
                <p className="designer-role">Graphic Designer</p>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <p className="task-client">Client: {task.client}</p>
            <p className="task-deadline">Deadline: {task.deadline}</p>
          </div>

          <div className="correction-toast-container">
            {task.corrections.map((c, i) => (
              <div key={i} className="correction-toast">
                <span>{c}</span>
              </div>
            ))}
          </div>

          <div className="task-status">
            <button className="btn correction" onClick={handleCorrection}>
              Correction
            </button>
            <button className="btn rejected" onClick={handleRejected}>
              Rejected
            </button>
            <button className="btn approved" onClick={handleApproved}>
              Approved
            </button>
          </div>
        </div>
      </div>

{showForm && (
  <CorrectionForm
    designer={task.designer}
    client={task.client}
    deadline={task.deadline}
    onClose={() => setShowForm(false)}
    onAssign={(points) => {
      onAssignCorrection(task.id, points);
      setShowForm(false);
    }}
  />
)}



      {showImage && (
        <div
          className="image-preview-overlay"
          onClick={() => setShowImage(false)}
        >
          <div
            className="image-preview-container"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={diwali} alt="Full Preview" className="image-preview" />
            <button
              className="close-preview"
              onClick={() => setShowImage(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCompletedCard;
