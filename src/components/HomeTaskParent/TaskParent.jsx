import React, { useState, useMemo ,useEffect } from "react";
import HomeTask from "./HomeTask";
import TaskListhome from "./TaskListhome";
import SecondNav from "../SecondNav";
import "../../assets/css/Tasklisthome.css";
import { Modal, Button, Form } from "react-bootstrap";
import Calendar from "../Calendar";
import Clientlist from "./Clientlist";

const TaskParent = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Diwali Card",
      type: "Image/Card",
      deadline: "2025-10-15",
      client: "Client A",
      description: "Festival greeting card",
      reference: "ref-link.com",
      priority: "High",
      designer: "Yedhu",
      status: "pending",
      upload: "",
      notification: true,
      corrections: [],
    },
    {
      id: 2,
      title: "Promo Video",
      type: "Video",
      deadline: "2025-10-20",
      client: "Client B",
      description: "30-sec video ad",
      reference: "ref-link.com",
      priority: "Medium",
      designer: "Nandhana",
      status: "completed",
      upload: "video.mp4",
      notification: true,
      corrections: [],
    },
    
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [correctionMessages, setCorrectionMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const currentUser = "Yedhu";
// Load tasks from localStorage on mount
useEffect(() => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (savedTasks.length > 0) {
    setTasks(savedTasks);
  }
}, []);

// Save tasks to localStorage whenever they change
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

const handleAddTask = (newTask) => {
  const taskWithId = {
    id: Date.now(),
    corrections: [],
    upload: "",
    notification: true,
    ...newTask,
  };
  setTasks((prev) => [...prev, taskWithId]);
};


  // Delete Task
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Edit Task
  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  // Save Edited Task
  const handleUpdate = (e) => {
    e.preventDefault();
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === selectedTask.id ? selectedTask : t))
    );
    setShowEditModal(false);
  };

  // Input change handler (edit form)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedTask((prev) => ({ ...prev, [name]: value }));
  };

  // File upload
  const handleUpload = (taskId, file) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, upload: URL.createObjectURL(file), status: "completed" }
          : task
      )
    );
  };

  // View corrections
  const handleViewCorrections = (task) => {
    setCorrectionMessages(task.corrections || []);
    setSelectedTask(task);
    setShowCorrectionModal(true);
  };

  // Filter + Search
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];
    const today = new Date();

    if (filterType === "incomplete") filtered = filtered.filter((t) => t.status.toLowerCase() !== "completed");
    else if (filterType === "mywork") filtered = filtered.filter((t) => t.designer === currentUser);
    else if (filterType === "dueThisWeek") {
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      filtered = filtered.filter((t) => {
        const d = new Date(t.deadline);
        return d >= today && d <= nextWeek;
      });
    } else if (filterType === "dueNextWeek") {
      const nextWeekStart = new Date();
      nextWeekStart.setDate(today.getDate() + 7);
      const nextWeekEnd = new Date();
      nextWeekEnd.setDate(today.getDate() + 14);
      filtered = filtered.filter((t) => {
        const d = new Date(t.deadline);
        return d >= nextWeekStart && d <= nextWeekEnd;
      });
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.designer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [tasks, searchTerm, filterType]);

  return (
    <div className="dashboard-container">
      <SecondNav
        onAddTask={handleAddTask}
        onFilter={setFilterType}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <HomeTask tasks={tasks} />

      <TaskListhome
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUpload={handleUpload}
        onViewCorrections={handleViewCorrections}
      />

<Clientlist/>
      <Calendar />

      {/* Edit Task Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdate}>
          <Modal.Body>
            {selectedTask && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={selectedTask.title}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Client</Form.Label>
                  <Form.Control
                    type="text"
                    name="client"
                    value={selectedTask.client}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    type="date"
                    name="deadline"
                    value={selectedTask.deadline}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    name="priority"
                    value={selectedTask.priority}
                    onChange={handleChange}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={selectedTask.status}
                    onChange={handleChange}
                  >
                    <option>pending</option>
                    <option>completed</option>
                    <option>upcoming</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button type="submit" className="savechangesbtn">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Correction Modal */}
      <Modal show={showCorrectionModal} onHide={() => setShowCorrectionModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Corrections for {selectedTask?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {correctionMessages.length > 0 ? (
            <ul>
              {correctionMessages.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          ) : (
            <p>No corrections yet.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCorrectionModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskParent;
