import React from "react";
import "../../assets/css/AssignedEmployees.css";

const AssignedEmployees = ({ employees }) => {
  return (
    <div className="assigned-container">
      <h2 className="assigned-title mb-5">Assigned Employees</h2>
      <div className="employee-grid">
        {employees.map((emp, index) => (
          <div key={index} className="employee-card">
            <div className="employee-avatar">
              <i className="bi bi-person-circle"></i>
            </div>
            <h5 className="employee-name">{emp.name}</h5>
            <p className="employee-role">{emp.role}</p>
            <p className="employee-task">
              <span>Total Tasks:</span> {emp.totalTasks}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedEmployees;
