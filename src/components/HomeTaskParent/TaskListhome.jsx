import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../assets/css/Tasklisthome.css";
import CorrectionForm from "../completed/CorrectionForm";

const TaskListhome = ({
  tasks,
  onEdit,
  onDelete,
  onUpload,
  onAssignCorrection,
  onViewCorrections,
  limit = 4,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isFullTaskPage = location.pathname === "/full-tasks";

  const handleFileChange = (e, taskId) => {
    const file = e.target.files[0];
    if (file) onUpload(taskId, file);
  };



  const handleViewCorrections = (taskId) => {
    navigate(`/correction-details/${taskId}`);
  };

  const visibleTasks = isFullTaskPage
    ? [...tasks].reverse()
    : tasks.slice(-limit).reverse();

  return (
    <div className="tasklist-container">
      <div className="tasklist-header d-flex justify-content-between align-items-center">
        <h2 className="tasklist-title">
          {isFullTaskPage ? "All Tasks" : "Recent Tasks"}
        </h2>

        {!isFullTaskPage && (
          <Link to="/full-tasks" className="view-full-btn">
            View Full Tasks
          </Link>
        )}
      </div>

      <div className="table-responsive">
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Deadline</th>
              <th>Client</th>
              <th>Description</th>
              <th>Reference</th>
              <th>Priority</th>
              <th>Designer</th>
              <th>Status</th>
              <th>Upload</th>
              <th>Corrections</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleTasks.length > 0 ? (
              visibleTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.type}</td>
                  <td>{task.deadline}</td>
                  <td>{task.client}</td>
                  <td>{task.description}</td>

                  <td>
                    <a href={task.reference} target="_blank" rel="noreferrer">
                      Link
                    </a>
                  </td>

                  <td>{task.priority}</td>
                  <td>{task.designer}</td>
                  <td>{task.status}</td>

                  <td>
                    {task.upload ? (
                   <Link to={`/CompletedTasks/${task.id}`} className="view-file-link">
  View File
</Link>

                    ) : (
                      <label className="upload-btn">
                        Upload
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleFileChange(e, task.id)}
                        />
                      </label>
                    )}
                  </td>

                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => handleViewCorrections(task.id)}
                    title="View correction details"
                  >
                    {task.corrections?.length > 0 ? (
                      <i className="bi bi-bell-fill text-danger"></i>
                    ) : (
                      <i className="bi bi-bell-slash text-muted"></i>
                    )}
                  </td>

                  <td className="btnss d-flex gap-2 justify-content-between">
                    <button className="editbtn" onClick={() => onEdit(task)}>
                      Edit
                    </button>
                    <button
                      className="deletebtn"
                      onClick={() => onDelete(task.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center text-muted">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

{showForm && currentTask && (
  <CorrectionForm
    taskId={currentTask.id}
    designer={currentTask.designer}
    client={currentTask.client}
    deadline={currentTask.deadline}
    onClose={() => setShowForm(false)}
    onAssign={(correction) => {
      onAssignCorrection(currentTask.id, correction);
      setShowForm(false);
    }}
  />
)}


    </div>
  );
};

export default TaskListhome;
