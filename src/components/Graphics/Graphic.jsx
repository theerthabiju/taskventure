import React , {useState} from 'react'
import TaskListhome from "../HomeTaskParent/TaskListhome";
import SecondNav from "../SecondNav";
import AssignedEmployees from './AssignedEmployees';
import MyCalendar from '../MyCalendar';



const Graphic = () => {
    const employeesData = [
  { name: "Nandhana K P", role: "Graphic Designer", totalTasks: 5 },
  { name: "Edhu", role: "Graphic Designer", totalTasks: 5 },
  { name: "Nandhana Vijayan", role: "Graphic Designer", totalTasks: 5 },
  { name: "Diloop", role: "AI", totalTasks: 3 },
];
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
          status: "Pending",
          upload: "",
          notification: true,
           corrections: [], // <--- new

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
          status: "Completed",
          upload: "video.mp4",
          notification: true,
              corrections: [], // <--- new

        },
            {
          id: 3,
          title: "Promo Video",
          type: "Video",
          deadline: "2025-10-20",
          client: "Client B",
          description: "30-sec video ad",
          reference: "ref-link.com",
          priority: "Medium",
          designer: "Nandhana",
          status: "In progress",
          upload: "",
          notification: true,
              corrections: [], // <--- new

        },
            {
          id: 4,
          title: "Image",
          type: "Video",
          deadline: "2025-10-20",
          client: "Client B",
          description: "30-sec video ad",
          reference: "ref-link.com",
          priority: "Medium",
          designer: "Nandhana",
          status: "Completed",
          upload: "video.mp4",
          notification: true,
              corrections: [], // <--- new

        },
            {
          id: 5,
          title: "Promo Video",
          type: "Video",
          deadline: "2025-10-20",
          client: "Client B",
          description: "30-sec video ad",
          reference: "ref-link.com",
          priority: "Medium",
          designer: "Nandhana",
          status: "Completed",
          upload: "video.mp4",
          notification: true,
              corrections: [], // <--- new

        },
            {
          id: 6,
          title: "Promo Video",
          type: "Image",
          deadline: "2025-10-20",
          client: "Client B",
          description: "30-sec video ad",
          reference: "ref-link.com",
          priority: "Medium",
          designer: "Nandhana",
          status: "Pending",
          upload: "",
          notification: true,
              corrections: [], // <--- new

        },
            {
          id: 7,
          title: "Promo Video",
          type: "Video",
          deadline: "2025-10-20",
          client: "Client B",
          description: "30-sec video ad",
          reference: "ref-link.com",
          priority: "Medium",
          designer: "Nandhana",
          status: "In Progress",
          upload: "",
          notification: true,
              corrections: [], // <--- new

        },
      ]);
    
      const [searchTerm, setSearchTerm] = useState("");
      const [filterType, setFilterType] = useState("");
      const currentUser = "Yedhu";
    
      const handleUpload = (taskId, file) => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId
              ? { ...task, upload: URL.createObjectURL(file), status: "Completed" }
              : task
          )
        );
      };
    const handleAddCorrection = (taskId, points) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === taskId
        ? { ...task, corrections: [...task.corrections, points], notification: true }
        : task
    )
  );
};

      const handleEdit = (task) => {
        console.log("Edit task:", task);
      };
    
      const handleDelete = (taskId) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
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
  return (
    <div>
       <SecondNav
              onAddTask={() => {}}
              onFilter={setFilterType}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
         <TaskListhome
  title="Task List"
  tasks={filteredTasks}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onUpload={handleUpload}
  onAssignCorrection={(taskId, points) => handleAddCorrection(taskId, points)}
/>

<MyCalendar/>
      <AssignedEmployees employees={employeesData} />

    </div>
  )
}

export default Graphic
