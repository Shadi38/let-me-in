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
pool.connect();

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});

app.get("/", (req, res) => {
  res.send(`Welcome to Final Project server on port  ${port}`);
});

const getNameStatus = async (req, res) => {
  const query = "select * from Entery_data";
  try {
    const data = await pool.query(query);
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: "failure",
      message: "No data found",
    });
    pool.end();
  }
};

module.exports = getNameStatus;




app.get("/names", getNameStatus);

