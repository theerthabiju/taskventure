import React, { useState } from "react";
import "../../assets/css/ProfileSettings.css";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: "Nikhil Thomas",
    email: "nikhilthomas@gmail.com",
    department: "",
    role: "Owner",
    password: "",
    profileImage: null,
  });

  const [preview, setPreview] = useState(null);

  // Handle input field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle profile picture upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profileImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Save updates
  const handleSave = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-settings-container">
      <h2>Profile Settings</h2>

      <form className="profile-form" onSubmit={handleSave}>
        {/* Profile Image */}
        <div className="profile-image-section">
          <img
            src={preview || "https://via.placeholder.com/100"}
            alt="Profile"
            className="profile-image"
          />
          <label htmlFor="profileImage" className="upload-btn">
            Upload New Photo
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="profile-info">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />

          <label>Department</label>
         
             <select
             type="text"
            name="department"
            value={profile.department}
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

          <label>Role</label>
          <select
            name="role"
            value={profile.role}
            onChange={handleChange}
            required
          >
            <option value="HOD">HOD</option>
            <option value="Employee">Employee</option>
            <option value="Owner">Owner</option>
            <option value="Client">Client</option>
          </select>

          <label>Change Password</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>

        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
