import React, { useState, useEffect } from "react";
import TaskCompletedCard from "../completed/TaskCompletedCard";
import "../../assets/css/manager.css";
import SecondNav from "../SecondNav";

const ManagerApproval = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage or use an example
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (storedTasks.length === 0) {
      // Example task for manager approval
      const exampleTask = {
        id: 1,
        title: "Website Banner Design",
        designer: "Nandhana",
        client: "Nike",
        deadline: "2025-10-25",
        upload: "https://via.placeholder.com/300x200.png?text=Manager+Task",
        status: "Completed",
        corrections: [],
      };
      setTasks([exampleTask]);
    } else {
      // Show only completed tasks
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

    // Update localStorage
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, corrections: [...(task.corrections || []), correction] }
        : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
          <SecondNav />

       <div className="manager-approval-page">
      
      <h2 className="manager">Manager Approval</h2>

      {tasks.length === 0 ? (
        <p>No completed tasks for approval.</p>
      ) : (
        <div className="task-card-grid">
          {tasks.map((task) => (
            <TaskCompletedCard
              key={task.id}
              task={task}
              onAssignCorrection={handleAssignCorrection}
            />
          ))}
        </div>
      )}
    </div>
    </>
 
  );
};

export default ManagerApproval;
