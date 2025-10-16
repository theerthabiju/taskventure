import React from 'react'

const Calendar = () => {
  return (
    <div>
        <div className='mb-5 mt-5 pt-5' style={{ paddingTop: "100px" ,padding:"20px"  }}>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=Asia%2FKolkata"
        style={{
          border: 0,
          width: "100%",
          height: "600px",
          borderRadius: "10px",
        }}
        frameBorder="0"
        scrolling="no"
        title="Google Calendar"
      ></iframe>
    </div>
    </div>
  )
}

export default Calendar
