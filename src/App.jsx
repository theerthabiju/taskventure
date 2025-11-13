import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navu from './components/Navu';
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import TaskParent from './components/HomeTaskParent/TaskParent';
import Calendar from './components/Calendar';
import Footer from './components/Footer';
import FullTaskPage from './components/FullTaskPage';
import Graphic from "./components/Graphics/Graphic";
import CompletedTasks from "./components/completed/CompletedTasks";
import CorrectionDetails from "./components/HomeTaskParent/CorrectionDetails";
import ManagerApproval from "./components/approvals/ManagerApproval";
import ClientApproval from "./components/approvals/Clientapproval";
import UserManagement from "./components/UserManagement/UserManagement";
import ProfileSettings from "./components/UserManagement/ProfileSettings";
import OwnerApproval from "./components/approvals/OwnerApproval";
import MyCalendar from "./components/MyCalendar";

function AppContent() {
  const location = useLocation();

  const hideLayout = ["/", "/register"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navu />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<TaskParent />} />
        <Route path="/full-tasks" element={<FullTaskPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/Graphics" element={<Graphic />} />
        <Route path="/CompletedTasks/:id" element={<CompletedTasks />} />
        <Route path="/Manager" element={<ManagerApproval />} />
        <Route path="/Client" element={<ClientApproval />} />
        <Route path="/Owner" element={<OwnerApproval/>} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/correction-details/:taskId" element={<CorrectionDetails />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/Mycalendar" element={<MyCalendar/>} />

      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
