import React, { useState, useEffect } from "react";
import TaskListhome from "./HomeTaskParent/TaskListhome";
import SecondNav from "../components/SecondNav";
import "../assets/css/Tasklisthome.css";
import Calendar from "./Calendar";
import AssignedEmployees from "./Graphics/AssignedEmployees";
import { Modal, Form, Button } from "react-bootstrap";

const FullTaskPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const currentUser = "Yedhu";

  const [showEditModal, setShowEditModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [showCorrections, setShowCorrections] = useState(false);
  const [selectedCorrections, setSelectedCorrections] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks((prev) => [
      ...prev,
      {
        ...newTask,
        id: prev.length + 1,
        corrections: [],
        upload: "",
        notification: true,
      },
    ]);
  };

  const handleUpload = (taskId, file) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, upload: URL.createObjectURL(file), status: "Completed" }
          : task
      )
    );
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowEditModal(true);
  };

  const saveEdit = () => {
    setTasks((prev) =>
      prev.map((t) => (t.id === editTask.id ? editTask : t))
    );
    setShowEditModal(false);
  };

  const handleDelete = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleAssignCorrection = (taskId, correction) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, corrections: [...(task.corrections || []), correction] }
          : task
      )
    );
  };

  const viewCorrections = (corrections) => {
    setSelectedCorrections(corrections);
    setShowCorrections(true);
  };

  const filteredTasks = tasks.filter((task) => {
    let keep = true;
    const today = new Date();

    if (filterType === "incomplete") keep = task.status !== "Completed";
    else if (filterType === "mywork") keep = task.designer === currentUser;
    else if (filterType === "dueThisWeek") {
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      const d = new Date(task.deadline);
      keep = d >= today && d <= nextWeek;
    } else if (filterType === "dueNextWeek") {
      const nextWeekStart = new Date();
      nextWeekStart.setDate(today.getDate() + 7);
      const nextWeekEnd = new Date();
      nextWeekEnd.setDate(today.getDate() + 14);
      const d = new Date(task.deadline);
      keep = d >= nextWeekStart && d <= nextWeekEnd;
    }

    if (searchTerm.trim() !== "") {
      keep =
        keep &&
        (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.designer.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return keep;
  });

  const employees = tasks.reduce((acc, task) => {
    const existing = acc.find((emp) => emp.name === task.designer);
    if (!existing) {
      acc.push({
        name: task.designer,
        role: "Graphic Designer",
        totalTasks: tasks.filter((t) => t.designer === task.designer).length,
      });
    } else {
      existing.totalTasks += 1;
    }
    return acc;
  }, []);

  return (
    <div className="dashboard-container">
      <SecondNav
        onAddTask={handleAddTask}
        onFilter={setFilterType}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <TaskListhome
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUpload={handleUpload}
        onAssignCorrection={handleAssignCorrection}
        onViewCorrections={viewCorrections}
      />

      <Calendar />
      <AssignedEmployees employees={employees} />

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editTask && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editTask.title}
                  onChange={(e) =>
                    setEditTask({ ...editTask, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Designer</Form.Label>
                <Form.Control
                  type="text"
                  value={editTask.designer}
                  onChange={(e) =>
                    setEditTask({ ...editTask, designer: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={editTask.status}
                  onChange={(e) =>
                    setEditTask({ ...editTask, status: e.target.value })
                  }
                >
                  <option>Pending</option>
                  <option>Completed</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button className="savbtnn" onClick={saveEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* --- Correction Modal --- */}
      <Modal show={showCorrections} onHide={() => setShowCorrections(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>HOD Corrections</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCorrections.length > 0 ? (
            <ul>
              {selectedCorrections.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          ) : (
            <p>No corrections</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FullTaskPage;
