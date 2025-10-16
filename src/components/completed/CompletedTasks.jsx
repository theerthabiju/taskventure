import React, { useState } from "react";
import TaskCompletedCard from "./TaskCompletedCard";
import "../../assets/css/CompletedTasks.css";
import SecondNav from "../SecondNav";

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([
    {
      id: 1,
      designer: "Nandhana K P",
      client: "ABC",
      deadline: "01-10-25",
      corrections: [],
    },
    {
      id: 2,
      designer: "Yedhu",
      client: "XYZ",
      deadline: "03-10-25",
      corrections: [],
    },
    {
      id: 3,
      designer: "fariz",
      client: "PQR",
      deadline: "05-10-25",
      corrections: [],
    },
  ]);

  const handleAssignCorrection = (taskId, correction) => {
    setCompletedTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, corrections: [...task.corrections, correction] }
          : task
      )
    );
  };

  return (
    <>
          <SecondNav/>

    <div className="completed-section">
      <h2 className="completed-title">TASKS ARE COMPLETED</h2>

      <div className="completed-grid">
        {completedTasks.map((task) => (
          <TaskCompletedCard
            key={task.id}
            task={task}
            onAssignCorrection={handleAssignCorrection}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default CompletedTasks;
