import React, { useState, useEffect } from "react";
import "../../assets/css/manager.css";
import SecondNav from "../SecondNav";

const OwnerApproval = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (storedTasks.length === 0) {
      const exampleTask = {
        id: 1,
        title: "Homepage Redesign",
        designer: "Nandhana",
        client: "Adidas",
        deadline: "2025-10-25",
        upload: "https://via.placeholder.com/300x200.png?text=Owner+Task",
        status: "Pending Owner Approval",
        feedback: [],
      };
      setTasks([exampleTask]);
      localStorage.setItem("tasks", JSON.stringify([exampleTask]));
    } else {
      setTasks(storedTasks.filter((task) => task.status === "Pending Owner Approval"));
    }
  }, []);

  const handleApprove = (taskId) => {
    const updated = tasks.filter((t) => t.id !== taskId);
    setTasks(updated);
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        JSON.parse(localStorage.getItem("tasks")).map((t) =>
          t.id === taskId ? { ...t, status: "Owner Approved " } : t
        )
      )
    );
    alert("Task approved by Owner ");
  };

  const handleReject = (taskId) => {
    const updated = tasks.filter((t) => t.id !== taskId);
    setTasks(updated);
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        JSON.parse(localStorage.getItem("tasks")).map((t) =>
          t.id === taskId ? { ...t, status: "Rejected by Owner " } : t
        )
      )
    );
    alert("Task rejected by Owner ");
  };

  // Add feedback/comment
  const handleAddFeedback = (taskId, feedback) => {
    if (!feedback.trim()) return;
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, feedback: [...(task.feedback || []), feedback] }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <SecondNav />
      <div className="manager-approval-page">
        <h2 className="manager">Owner Approval</h2>

        {tasks.length === 0 ? (
          <p>No tasks pending owner approval.</p>
        ) : (
          <div className="task-card-grid">
            {tasks.map((task) => (
              <div key={task.id} className="task-card">
                <img
                  src={task.upload}
                  alt={task.title}
                  className="task-image"
                />
                <div className="task-info">
                  <h3>{task.title}</h3>
                  <p>
                    <strong>Designer:</strong> {task.designer}
                  </p>
                  <p>
                    <strong>Client:</strong> {task.client}
                  </p>
                  <p>
                    <strong>Deadline:</strong> {task.deadline}
                  </p>
                  <p>
                    <strong>Status:</strong> {task.status}
                  </p>

                  {/* Feedback Section */}
                  <div className="feedback-section">
                    <h5>Owner Feedback</h5>
                    <ul>
                      {task.feedback && task.feedback.length > 0 ? (
                        task.feedback.map((f, i) => (
                          <li key={i}>💬 {f}</li>
                        ))
                      ) : (
                        <p>No feedback yet.</p>
                      )}
                    </ul>
                    <FeedbackInput
                      taskId={task.id}
                      onAddFeedback={handleAddFeedback}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="btn-group">
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(task.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleReject(task.id)}
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

const FeedbackInput = ({ taskId, onAddFeedback }) => {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="comment-input">
      <input
        type="text"
        placeholder="Add feedback or comment..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button
        onClick={() => {
          onAddFeedback(taskId, feedback);
          setFeedback("");
        }}
      >
        Add
      </button>
    </div>
  );
};

export default OwnerApproval;
