import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import "../../assets/css/clientlist.css";

const Clientlist = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editClient, setEditClient] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("clients")) || [];
    setClients(stored);
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  // Open modal for new or edit
  const handleShow = (client = null) => {
    setEditClient(client);
    setShowModal(true);
  };
  const isFullTaskPage = location.pathname === "/full-tasks";

  const handleClose = () => {
    setShowModal(false);
    setEditClient(null);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newClient = {
      id: editClient ? editClient.id : Date.now(),
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      company: form.company.value,
    };

    if (editClient) {
      // update
      setClients((prev) =>
        prev.map((c) => (c.id === editClient.id ? newClient : c))
      );
    } else {
      // add new
      setClients((prev) => [...prev, newClient]);
    }

    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      setClients((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="clientlist-container">
      <div className="header d-flex justify-content-between align-items-center mb-3">
          <h2 className="tasklist-title">
          {isFullTaskPage ? "All Tasks" : "Client List"}
        </h2>
        <Button                    style={{backgroundColor:"#3f51b5"}}
 onClick={() => handleShow()}>
          + Add Client
        </Button>
      </div>

      <Table bordered hover responsive className="client-table">
        <thead>
          <tr                   
>
            <th  style={{color:"#3f51b5"}}>#</th>
            <th  style={{color:"#3f51b5"}}>Client Name</th>
            <th  style={{color:"#3f51b5"}}>Company</th>
            <th  style={{color:"#3f51b5"}}>Email</th>
            <th  style={{color:"#3f51b5"}}>Phone</th>
            <th style={{ textAlign: "center",color:"#3f51b5" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((client, index) => (
              <tr key={client.id}>
                <td>{index + 1}</td>
                <td>{client.name}</td>
                <td>{client.company}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td className="text-center">
                  <Button
                    size="sm"
                                       style={{backgroundColor:"#3f51b5"}}

                    onClick={() => handleShow(client)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    size="sm"
                   style={{backgroundColor:"#3f51b5"}}
                    onClick={() => handleDelete(client.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No clients added yet
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editClient ? "Edit Client" : "Add Client"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                name="name"
                defaultValue={editClient?.name || ""}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                name="company"
                defaultValue={editClient?.company || ""}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                defaultValue={editClient?.email || ""}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                type="text"
                defaultValue={editClient?.phone || ""}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="submitbttn">
              {editClient ? "Save Changes" : "Add Client"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Clientlist;

