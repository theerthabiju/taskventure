import React, { useState } from "react";
import "../../assets/css/UserManagement.css";
import SecondNav from "../SecondNav";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add user
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) {
      alert("Please fill all required fields!");
      return;
    }
    setUsers([...users, formData]);
    setFormData({ name: "", email: "", role: "", department: "" });
  };

  // Delete user
  const handleDelete = (index) => {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
  };

  return (
<>

    <SecondNav/>
    <div className="user-management">
      <h2 className="usermanagement">User Management</h2>

      {/* Add User Form */}
      <form className="add-user-form" onSubmit={handleAddUser}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="HOD">HOD</option>
          <option value="Employee">Employee</option>
          <option value="Owner">Owner</option>
          <option value="Client">Client</option>
        </select>
        <select
         type="text"
          name="department"
          placeholder="Department (optional)"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Development">Development</option>
          <option value="AI">AI</option>
          <option value="Graphic Designing">Graphic Designing</option>
        <option value="Content Creator">Content Creator</option>
        <option value="Social Media">Social Media</option>

        </select>

       

        <button type="submit">Add User</button>
      </form>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5">No users added yet</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.department}</td>
                <td>
                  <button className="deletebtnn" onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default UserManagement;
