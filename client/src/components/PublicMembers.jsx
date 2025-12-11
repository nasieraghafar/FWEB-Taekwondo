import { useEffect, useState } from "react";

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
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBelt, setSelectedBelt] = useState("");

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

  // Filter records based on search term, selected year, and selected belt
  const filteredRecords = records.filter((record) => {
    const matchesSearch = record.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear
      ? record.year_of_study === selectedYear
      : true;
    const matchesBelt = selectedBelt ? record.belt_level === selectedBelt : true;

    return matchesSearch && matchesYear && matchesBelt;
  });

  function recordList() {
    return filteredRecords.map((record) => (
      <Record record={record} key={record._id} />
    ));
  }

  return (
    <div className="container">
      {/* Flex container for the search/filter and table */}
      <div className="flex-container">
        {/* Left column for "Our Members" heading and search/filter */}
        <div className="public-left-column">
          <h3 className="public-heading-left">Our Members</h3>
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
        <div className="right-column">
          <table className="table table-striped table-container">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Belt</th>
                <th>Year</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>{recordList()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
