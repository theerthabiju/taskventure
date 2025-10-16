import React, { useState } from "react";
import { Link , useNavigate  } from "react-router-dom"; 
import "../assets/css/Navbar.css";
import logo from "../assets/Images/venture-white.png"

function Navu() {
   const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="Navbardiv">
        <div className="navbar_container">
          <img className="logo" src={logo} alt="" />
          {/* <h1 className="logoname text-white mb-0">TASK VENTURE</h1> */}

          <div
            className="hamburger"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="bi bi-list"></i>
          </div>

          <ul className={`navlist mb-0 ${isOpen ? "open" : ""}`}>
            <li>
              <Link to="/" className="tasklink">Dashboard</Link> 
              </li>
            <li>
            <Link to="/full-tasks" className="tasklink">Task List</Link> 

            </li>
            <li>            <Link to="/calendar" className="tasklink">Calendar</Link> 
</li>
    <li className="profile-dropdown" style={{ position: "relative" }}>
              <i
                className="bi bi-person-circle"
                style={{ cursor: "pointer", fontSize: "1.6rem" }}
                onClick={toggleDropdown}
              ></i>

              {isOpen && (
                <ul
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "120%",
                    backgroundColor: "#fff",
                    listStyle: "none",
                    padding: "10px 0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    minWidth: "180px",
                    zIndex: 1000,
                  }}
                >
                <li>
        <button
          className="dropdown-item"
          style={{
            border: "none",
            background: "none",
            width: "100%",
            textAlign: "left",
            padding: "8px 16px",
          }}
          onClick={() => {
            navigate("/profile-settings");
            closeDropdown();
          }}
        >
          <i className="bi bi-gear me-2"></i> Profile Settings
        </button>
      </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      style={{
                        border: "none",
                        background: "none",
                        width: "100%",
                        textAlign: "left",
                        padding: "8px 16px",
                        color: "red",
                      }}
                      onClick={() => {
                        alert("Logged out");
                        closeDropdown();
                      }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>


          </ul>
        </div>
      </div>
    </>
  );
}

export default Navu;
