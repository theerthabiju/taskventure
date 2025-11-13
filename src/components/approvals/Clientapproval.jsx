import React, { useState, useEffect } from "react";
import "../../assets/css/clientapproval.css";
import SecondNav from "../SecondNav";

const ClientApproval = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (storedTasks.length === 0) {
      const exampleTask = {
        id: 1,
        title: "Social Media Banner",
        designer: "Nandhana",
        client: "Nike",
        deadline: "2025-10-20",
        upload: "https://via.placeholder.com/300x200.png?text=Example+Task",
        status: "In Review",
        progress: 75,
        comments: [],
      };
      setTasks([exampleTask]);
      localStorage.setItem("tasks", JSON.stringify([exampleTask]));
    } else {
      setTasks(storedTasks);
    }
  }, []);

  const handleApprove = (task) => {
    alert(`Task for client ${task.client} has been APPROVED `);
    const updated = tasks.filter((t) => t.id !== task.id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const handleReject = (task) => {
    alert(`Task for client ${task.client} has been REJECTED `);
    const updated = tasks.filter((t) => t.id !== task.id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const handleAddComment = (taskId, comment) => {
    if (!comment.trim()) return;
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, comments: [...(task.comments || []), comment] }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <SecondNav />
      <div className="client-approval-page">
        <h2 className="client">Work Progress</h2>

        {tasks.length === 0 ? (
          <p>No tasks available for review.</p>
        ) : (
          <div className="task-card-grid">
            {tasks.map((task) => (
              <div className="task-card" key={task.id}>
                <img src={task.upload} alt={task.title} className="task-image" />

                <div className="task-details">
                  <h3>{task.title}</h3>
                  <p>
                    <strong className="designername">Designer:</strong> {task.designer}
                  </p>
                  <p>
                    <strong className="designername">Deadline:</strong> {task.deadline}
                  </p>
                  <p>
                    <strong className="designername">Status:</strong> {task.status}
                  </p>

                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <p className="progress-text">{task.progress}% completed</p>

                  <div className="comment-section">
                    <h4>Client Comments</h4>
                    <ul>
                      {task.comments && task.comments.length > 0 ? (
                        task.comments.map((c, index) => (
                          <li key={index} className="comment-item">
                            💬 {c}
                          </li>
                        ))
                      ) : (
                        <p>No comments yet.</p>
                      )}
                    </ul>

                    <CommentInput taskId={task.id} onAdd={handleAddComment} />
                  </div>

                  <div className="btn-group">
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(task)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleReject(task)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

// 💬 Sub-component for adding comments
const CommentInput = ({ taskId, onAdd }) => {
  const [comment, setComment] = useState("");

  return (
    <div className="comment-input">
      <input
        type="text"
        placeholder="Add your suggestion..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={() => {
          onAdd(taskId, comment);
          setComment("");
        }}
      >
        Add
      </button>
    </div>
  );
};

export default ClientApproval;
