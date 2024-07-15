import React, { useState, useEffect } from "react";

function InputName({ setSelectedName }) {
  const [fetchedData, setFetchedData] = useState([]);

  const handleDisplayData = async () => {
    try {
      const res = await fetch(`http://localhost:3003/names`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setFetchedData(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    handleDisplayData();
  }, []);

  return (
    <div className="inputName">
      <select onChange={(e) => setSelectedName(e.target.value)}>
        <option value="">Select a name</option>
        {fetchedData.length > 0 ? (
          fetchedData.map((entry, index) => (
            <option key={index} value={entry.name}>
              {entry.name}
            </option>
          ))
        ) : (
          <option>Loading...</option>
        )}
      </select>
    </div>
  );
}

export default InputName;
