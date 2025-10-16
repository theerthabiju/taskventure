import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navu from './components/Navu';
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

function App() {
  return (
    <Router>
      <Navu />
      <Routes>
        <Route path="/" element={<TaskParent />} /> 
        
        <Route path="/full-tasks" element={<FullTaskPage />} /> 
        <Route path="/calendar" element={<Calendar />} />
     <Route path="/Graphics" element={<Graphic/>} />
<Route path="/CompletedTasks/:id" element={<CompletedTasks />} />
          <Route path="/Manager" element={<ManagerApproval/>} />
       <Route path="/Client" element={<ClientApproval/>} />
     <Route path="/UserManagement" element={<UserManagement/>} />
<Route path="/correction-details/:taskId" element={<CorrectionDetails/>} />
        <Route path="/profile-settings" element={<ProfileSettings/>} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
