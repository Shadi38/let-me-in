require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3003;
const pool = require("./database/data");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

pool
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database", err));

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});

app.get("/", (req, res) => {
  res.send(`Welcome to Final Project server on port ${port}`);
});

const getNameStatus = async (req, res) => {
  const query = "SELECT * FROM Entry_data";
  try {
    const data = await pool.query(query);
    res.status(200).json(data.rows);
  } catch (error) {
    console.error("Error fetching name status:", error);
    res.status(500).json({
      result: "failure",
      message: "No data found",
    });
  }
};
module.exports = getNameStatus;

app.put("/checkIn", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const query = `UPDATE Entry_data
                  SET status = 'in'
                  WHERE name = $1 AND status = 'out'
                  RETURNING *`;
  try {
    const result = await pool.query(query, [name]);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "No matching entry found or already checked in" });
    }

    res.json({ message: "Status updated to in", entry: result.rows[0] });
  } catch (err) {
    console.error("Error updating status to in:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/checkOut", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const query = `UPDATE Entry_data
                  SET status = 'out'
                  WHERE name = $1 AND status = 'in'
                  RETURNING *`;
  try {
    const result = await pool.query(query, [name]);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "No matching entry found or already checked out" });
    }

    res.json({ message: "Status updated to out", entry: result.rows[0] });
  } catch (err) {
    console.error("Error updating status to out:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/names", getNameStatus);
