import React, { useState } from "react";
import "./style.css";

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay(); 

const generateCalendar = (currentMonth) => {
  const daysInMonth = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );
  const startingDay = getFirstDayOfMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  const calendarData = [];
  let currentWeek = [];

  // Fill in empty cells for days before the start of the month
  for (let i = 0; i < startingDay; i++) {
    currentWeek.push(null);
  }

  // Fill in days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    );

    // Start a new row for the next week
    if (currentWeek.length === 7) {
      calendarData.push(currentWeek);
      currentWeek = [];
    }
  }

  // Fill in empty cells for days after the end of the month
  while (currentWeek.length < 7) {
    currentWeek.push(null);
  }

  calendarData.push(currentWeek);

  return calendarData;
};

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);

  const handleMonthChange = (increment) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
  };

  const calendarData = generateCalendar(currentMonth);

  const monthName = currentMonth.toLocaleDateString(undefined, {
    month: "long",
  });

  const handleDateSelection = (e) => {
    const clickedDate = e.target.getAttribute("data-ns-date");
    e.target.classList.toggle("selected");
    if (selectedDates.includes(clickedDate)) {
      const updatedDates = selectedDates.filter(
        (selectedDate) => selectedDate !== clickedDate
      );
      setSelectedDates(updatedDates);
    } else {
      setSelectedDates([...selectedDates, clickedDate]);
    }
  };

  const getDateString = (day) => {
    if (day) {
      const dateString = `${day.getDate().toString().padStart(2, "0")}-${(
        day.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${day.getFullYear()}`;
      return dateString;
    }else{
      return ""
    }
  };
  return (
    <div className="main-container">
      <div id="container">

      
      <div className="btns-container">
        <button onClick={() => handleMonthChange(-1)}>Prev</button>
        <button onClick={() => handleMonthChange(1)}>Next</button>
      </div>
      <div>{monthName}</div>
      <table className="dates-container">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {calendarData.map((week, index) => (
            <tr key={index}>
              {week.map((day, dayIndex) => (
                <td
                  className={
                    selectedDates?.includes(getDateString(day))
                      ? "selected"
                      : ""
                  }
                  key={day ? day.toString() : `empty-${dayIndex}`}
                  data-ns-date={day ? getDateString(day) : ""}
                  onClick={(e) => handleDateSelection(e)}
                >
                  {day ? day.getDate() : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedDates.length > 0 && (
        <div className="display-date">
          <p>User Selected Dates -</p>
          <p>[{selectedDates.map((date) => date).join(", ")}]</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default App;
