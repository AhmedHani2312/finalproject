import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import './Explore.css';

function Explore() {
  const [universityData, setUniversityData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    async function fetchExcelData() {
      const filePath = `${process.env.PUBLIC_URL}/university_data.xlsx`;
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setUniversityData(jsonData);
    }
    
    fetchExcelData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLocationFilterChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const getUniqueLocations = (data) => {
    const locations = data.map((data) => data.Location);
    return [...new Set(locations)];
  };

  const filteredData = universityData
    .filter((university) =>
      searchTerm === '' || university['University Name'].toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((university) =>
      locationFilter === '' || university.Location === locationFilter
    );

  return (
    <div className="explore-container">
      <h2>Explore University Rankings</h2>
      <input
        type="text"
        className="search-bar"
        placeholder="Search for a university..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="table-container">
        <table className="university-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>University Name</th>
              <th>
                <div className="location-header">
                  Location
                  <select
                    value={locationFilter}
                    onChange={handleLocationFilterChange}
                    className="location-filter"
                  >
                    <option value="">Filter by Location</option>
                    {getUniqueLocations(universityData).map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </th>
              <th>Number of Students</th>
              <th>Overall Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((university, index) => (
              <tr key={index}>
                <td>{university.Rank}</td>
                <td>{university['University Name']}</td>
                <td>{university.Location}</td>
                <td>{university['Number of Students']}</td>
                <td>{university['Overall Score']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/" className="back-to-home-btn">Back to Home</Link>
    </div>
  );
}

export default Explore;
