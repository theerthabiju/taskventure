import React, { useState } from "react";
import "../assets/css/Secondnav.css";
import { Button, Modal, Form } from "react-bootstrap";

const SecondNav = ({ onAddTask, onFilter }) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false); 

  const clientList = ["Client A", "Client B", "Client C", "Client D"];
  const designerList = ["Yedhu", "Nandhana", "Yedhu2", "Fariz", "Nandhana KP"];

  const [formData, setFormData] = useState({
    title: "",
    type: "Image",
    deadline: "",
    client: "",
    description: "",
    reference: "",
    priority: "Medium",
    designer: "",
    status: "Pending",
    upload: "",
    notification: true,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0].name : value,
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.client || !formData.designer) {
      alert("Please fill Title, Client, and Designer");
      return;
    }
    onAddTask(formData); 
    setFormData({
      title: "",
      type: "Image",
      deadline: "",
      client: "",
      description: "",
      reference: "",
      priority: "Medium",
      designer: "",
      status: "Pending",
      upload: "",
      notification: true,
    });
    setShow(false);
  };

  const handleFilter = (type) => {
    onFilter(type);
    setFilterOpen(false);
  };

  return (
    <div className="secondnav-container">
      <div className="secondnav pt-2 pb-2 d-flex align-items-center gap-3">
        <p className="mb-0 Contentname">Task Management</p>

        <input
          className="searchbar"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for task/client/designers ..."
        />

        <div className="filter-dropdown" style={{ position: "relative" }}>
          <Button
            className="filter-btn"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            Filter
          </Button>
          {filterOpen && (
            <ul
              className="filter-menu"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                background: "#d2daf554",
                borderRadius: "10px",
                listStyle: "none",
                padding: "10px ",
                minWidth: "180px",
                zIndex: 1000,
              }}
            >
              <li
                className="filter-item"
                onClick={() => handleFilter("incomplete")}
              >
                Incomplete
              </li>
              <li
                className="filter-item"
                onClick={() => handleFilter("mywork")}
              >
                Only My Work
              </li>
              <li
                className="filter-item"
                onClick={() => handleFilter("dueThisWeek")}
              >
                Due This Week
              </li>
              <li
                className="filter-item"
                onClick={() => handleFilter("dueNextWeek")}
              >
                Due Next Week
              </li>
            </ul>
          )}
        </div>

        <Button className="createtaskbtn" onClick={handleShow}>
          <i className="bi bi-plus-square-fill"></i> Create New Task
        </Button>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select name="type" value={formData.type} onChange={handleChange}>
                  <option>Image</option>
                  <option>Video</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Deadline</Form.Label>
                <Form.Control type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Client</Form.Label>
                <Form.Select name="client" value={formData.client} onChange={handleChange}>
                  <option value="">Select Client</option>
                  {clientList.map((client, idx) => (
                    <option key={idx} value={client}>
                      {client}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Task details"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select name="priority" value={formData.priority} onChange={handleChange}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Designer</Form.Label>
                <Form.Select name="designer" value={formData.designer} onChange={handleChange}>
                  <option value="">Select Designer</option>
                  {designerList.map((designer, idx) => (
                    <option key={idx} value={designer}>
                      {designer}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={formData.status} onChange={handleChange}>
                  <option>Pending</option>
                  <option>Upcoming</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Task</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SecondNav;
