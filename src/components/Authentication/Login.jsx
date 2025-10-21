import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert(`Welcome ${user.username}!`);

      if (user.role === "employee") {
        navigate("/");
      } else if (user.role === "client") {
        navigate("/Client");
        
      } else if (user.role === "Designer") {
        navigate("/Graphics");
        
      }
       else if (user.role === "Manager") {
        navigate("/Manager");
        
      }
      else if (user.role === "Owner") {
        navigate("/Owner");
        
      }
      else {
        navigate("/");
      }
    } else {
      setErrors({ general: "Invalid username or password!" });
    }
  };

  return (
    <div className="auth-container">
      <h2 className="loginhead">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors((prev) => ({ ...prev, username: "", general: "" }));
            }}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "", general: "" }));
            }}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        {errors.general && <p className="error">{errors.general}</p>}

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account?{" "}
        <a href="/register" style={{ textDecoration: "none" }}>
          Register
        </a>
      </p>
    </div>
  );
};

export default Login;
