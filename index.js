const express = require("express");
const morgan = require("morgan");
const env = require("dotenv");
const carsRoute = require("./routes/cars.route");

env.config();
const app = express();
const PORT = process.env.PORT;

// Using morgan for logs
app.use(morgan("combined"));

// Parsing JSON bodies (Express 4.16.0 and higher)
app.use(express.json());

app.use("/cars", carsRoute);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
