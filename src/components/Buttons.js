import { useState } from "react";

function Buttons({ name }) {
  const [status, setStatus] = useState("out");
  const [message, setMessage] = useState("");
  const [checkedInUsers, setCheckedInUsers] = useState([]);

  const handleCheckIn = async () => {
    try {
      const res = await fetch(`http://localhost:3003/checkIn`, {
        method: "PUT",
        body: JSON.stringify({ name }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "User is already checked in") {
          setMessage(`${name} is already checked in.`);
        } else {
          throw new Error("Failed to update status");
        }
      } else {
        setStatus("in");
        setMessage(`${name} has checked in successfully.`);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      setMessage("Error checking in.");
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await fetch(`http://localhost:3003/checkOut`, {
        method: "PUT",
        body: JSON.stringify({ name }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "User is already checked out") {
          setMessage(`${name} is already checked out.`);
        } else {
          throw new Error("Failed to update status");
        }
      } else {
        setStatus("out");
        setMessage(`${name} has checked out successfully.`);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      setMessage("Error checking out.");
    }
  };

  const handleShowCheckedInUsers = async () => {
    try {
      const res = await fetch(`http://localhost:3003/names`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch checked-in users");
      }

      const data = await res.json();
      const checkedIn = data.filter((user) => user.status === "in");
      setCheckedInUsers(checkedIn);
    } catch (err) {
      console.error("Error fetching checked-in users:", err);
      setMessage("Error fetching checked-in users.");
    }
  };

  return (
    <div className="buttons">
      <button className="btn-check-in" onClick={handleCheckIn} disabled={!name}>
        Check-In
      </button>
      <button
        className="btn-check-out"
        onClick={handleCheckOut}
        disabled={!name}
      >
        Check-Out
      </button>
      <button className="btn-guest" onClick={handleShowCheckedInUsers}>
        I'm a Guest
      </button>
      {message && <p>{message}</p>}
      {checkedInUsers.length > 0 && (
        <div className="guest-info">
          <h3>You can call these users to get inside the building:</h3>
          {checkedInUsers.map((entry, index) => (
            <a href={`tel:${entry.phone}`} key={index} className="btn-call">
              {entry.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default Buttons;
