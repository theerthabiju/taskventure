import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "../assets/css/calendar.css"; // 

const MyCalendar = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div className="calendar-page">
      <div className="calendar-wrapper">
        <h2 className="calendar-title">Task Calendar</h2>

        <div className="calendar-container">
          <Calendar onChange={setValue} value={value} />
        </div>

        <p className="selected-date">
          Selected Date: <strong>{value.toDateString()}</strong>
        </p>
      </div>
    </div>
  );
};

export default MyCalendar;
