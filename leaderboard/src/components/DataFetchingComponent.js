import React, { useState, useEffect } from 'react';

function DataFetchingComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []); // The empty array means this effect runs once on mount

  return (
    <div>
      <h1>Data</h1>
      <ul>
        {data.map(item => (
          <li key={item.team_id}>{item.team_name}</li> // Adjust 'id' and 'name' based on your data structure
        ))}
      </ul>
      
      
    </div>
  );
}

export default DataFetchingComponent;
