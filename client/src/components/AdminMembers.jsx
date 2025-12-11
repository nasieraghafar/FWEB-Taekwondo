import { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';

const Record = (props) => (
  <tr>
    <td>
      {props.record.profile_image ? (
        <img
          src={props.record.profile_image} // Display profile image if available
          alt="Profile"
          style={{ width: "70px", height: "70px", borderRadius: "10%" }}
        />
      ) : (
        "No Image" // Display a fallback message if no image is provided
      )}
    </td>
    <td>{props.record.name}</td>
    <td>{props.record.belt_level}</td>
    <td>{props.record.year_of_study}</td>
    <td>{props.record.email}</td>
    <td>
      {/* Updated Button Styling */}
      <button
        className="btn btn-link update-btn"
        onClick={() => props.updateRecord(props.record._id)}
      >
        <i className="fas fa-edit"></i> Update
      </button>{" "}
      |
      <button
        className="btn btn-link delete-btn"
        onClick={() => props.deleteRecord(props.record._id)}
      >
        <i className="fas fa-trash-alt"></i> Delete
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBelt, setSelectedBelt] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch records from the database
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/students/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();
  }, []);

  // Filter records based on search term, year, and belt
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear
      ? record.year_of_study === selectedYear
      : true;
    const matchesBelt = selectedBelt ? record.belt_level === selectedBelt : true;

    return matchesSearch && matchesYear && matchesBelt;
  });

  // Delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/students/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // Navigate to update page
  function updateRecord(id) {
    navigate(`/edit/${id}`);
  }

  // Map out the records on the table
  function recordList() {
    return filteredRecords.map((record) => (
      <Record
        record={record}
        deleteRecord={() => deleteRecord(record._id)}
        updateRecord={() => updateRecord(record._id)}
        key={record._id}
      />
    ));
  }

  // Render the component
  return (
    <div className="container">
      {/* Add Member Button */}
      <div className="add-member-button-container">
        <button
          className="btn btn-danger add-member-button"
          onClick={() => navigate("/add-member")} // Navigate to the add member page
        >
          + Add Member
        </button>
      </div>

      {/* Flex container for the filter and table */}
      <div className="flex-container">
        {/* Left column for filters */}
        <div className="left-column">
          <h3 className="heading-left">Our Members</h3>
          <div className="filter-container">
            {/* Search input */}
            <input
              type="text"
              placeholder="Search by name"
              className="form-control mb-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Year filter dropdown */}
            <div className="filter-group">
              <h5>Year</h5>
              <select
                className="form-control"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">All Years</option>
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
                <option value="Year 3">Year 3</option>
              </select>
            </div>

            {/* Belt Level filter dropdown */}
            <div className="filter-group mt-3">
              <h5>Belt Level</h5>
              <select
                className="form-control"
                value={selectedBelt}
                onChange={(e) => setSelectedBelt(e.target.value)}
              >
                <option value="">All Belts</option>
                <option value="White">White</option>
                <option value="Yellow">Yellow</option>
                <option value="Green">Green</option>
                <option value="Blue">Blue</option>
                <option value="Red">Red</option>
                <option value="Black">Black</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right column for the table */}
        <div className="admin-right-column">
          <table className="table table-striped table-container">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Belt</th>
                <th>Year</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{recordList()}</tbody>
          </table>
        </div>
      </div>
    </div>

  );
}
