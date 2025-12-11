import React, { useState, useEffect } from "react";
import '../Attendance.css';

const MarkAttendance = () => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (date = selectedDate) => {
    try {
        const response = await fetch(`http://localhost:5050/students?date=${date}`);
        const data = await response.json();
        setStudents(data);

        // Update attendance status based on fetched data
        const initialStatus = {};
        data.forEach(student => {
            initialStatus[student._id] = student.attendanceStatus || "Not Marked";
        });

        setAttendanceStatus(initialStatus);
    } catch (error) {
        console.error("Error fetching students:", error);
    }
};


const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    fetchStudents(newDate); // Fetch attendance for the selected date
};


  const markAttendance = async (id, status) => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5050/students/${id}/attendance`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selectedDate, status }),
      });

      if (!response.ok) throw new Error("Failed to mark attendance");

      const updatedStudent = await response.json();

      setAttendanceStatus((prevStatus) => ({
        ...prevStatus,
        [id]: status,
      }));

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === id ? { ...student, attendancePercentage: updatedStudent.attendancePercentage } : student
        )
      );
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  return (
    <div className="attendance-container">
      <h2>Mark Attendance</h2>

      {/* Date Picker */}
      <div className="date-picker">
        <label>Select Date:</label>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Year</th>
            <th>Attendance Percentage</th>
            <th>Attendance Status</th>
            <th>Mark Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>
                <img
                  src={student.profile_image || "default-profile.png"}
                  alt="Profile"
                  className="student-profile-img"
                />
              </td>
              <td>{student.name}</td>
              <td>{student.year_of_study}</td>
              <td>{student.attendancePercentage}%</td>
              <td className={`attendance-status ${attendanceStatus[student._id]}`}>
                {attendanceStatus[student._id]}
              </td>
              <td className="attendance-buttons">
                <button className="present-btn" onClick={() => markAttendance(student._id, "Present")}>
                  Present
                </button>
                <button className="absent-btn" onClick={() => markAttendance(student._id, "Absent")}>
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarkAttendance;
