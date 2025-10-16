import React, { useState, useEffect } from "react";
import TaskCompletedCard from "../completed/TaskCompletedCard";
import "../../assets/css/clientapproval.css";
import SecondNav from "../SecondNav";

const ClientApproval = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage or use an example
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (storedTasks.length === 0) {
      // Add an example task
      const exampleTask = {
        id: 1,
        title: "Social Media Banner",
        designer: "Nandhana",
        client: "Nike",
        deadline: "2025-10-20",
        upload: "https://via.placeholder.com/300x200.png?text=Example+Task",
        status: "Completed",
        corrections: [],
      };
      setTasks([exampleTask]);
    } else {
      // Show completed tasks
      setTasks(storedTasks.filter((task) => task.status === "Completed"));
    }
  }, []);

  const handleAssignCorrection = (taskId, correction) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, corrections: [...(task.corrections || []), correction] }
          : task
      )
    );
  };

  const handleApprove = (task) => {
    alert(`Task for client ${task.client} has been APPROVED`);
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const handleReject = (task) => {
    alert(`Task for client ${task.client} has been REJECTED`);
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <>
            <SecondNav/>
             <div className="client-approval-page">
      <h2 className="client">Client Approval</h2>

      {tasks.length === 0 ? (
        <p>No tasks pending client approval.</p>
      ) : (
        <div className="task-card-grid">
          {tasks.map((task) => (
            <TaskCompletedCard
              key={task.id}
              task={task}
              onAssignCorrection={handleAssignCorrection}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>

</>
    );
}; 

export default ClientApproval;
