import React from "react";
import "../../assets/css/Home.css";

const HomeTask = ({ tasks }) => {
  const totalTasks = tasks.length;
  const pending = tasks.filter((t) => t.status.toLowerCase() === "pending").length;
  const completed = tasks.filter((t) => t.status.toLowerCase() === "completed").length;
  const upcoming = tasks.filter((t) => t.status.toLowerCase() === "upcoming").length;

  return (
    <div>
      {/* <div className="row hometaskrow mb-5 mt-5 ">
        <div className="col-md-12 hometaskcol">
          <div>
            <i className="bi bi-file-bar-graph-fill"></i>
            <p>Total Tasks: {totalTasks}</p>
          </div>
        </div>
      </div> */}

      <div className="row hometaskrow mt-5 pt-5">
          <div className="col-md-4 hometaskcol">
          <div>
            <i className="bi bi-file-bar-graph-fill"></i>
            <p>Total Tasks: {totalTasks}</p>
          </div>
        </div>
        <div className="col-md-4 hometaskcol">
          <div>
            <i className="bi bi-stopwatch-fill"></i>
            <p>Pending: {pending}</p>
          </div>
        </div>
        <div className="col-md-4 hometaskcol">
          <div>
            <i className="bi bi-check-circle-fill"></i>
            <p>Completed: {completed}</p>
          </div>
        </div>
        <div className="col-md-4 hometaskcol">
          <div>
            <i className="bi bi-file-arrow-down-fill"></i>
            <p>Upcoming: {upcoming}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTask;
