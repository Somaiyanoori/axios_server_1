// Import required modules
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Get current directory (__dirname in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the data.json file
const dataPath = path.join(__dirname, "data.json");

// Read data from data.json if it exists
let data = [];
if (fs.existsSync(dataPath)) {
  data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}

// Middleware to parse incoming request data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET /random - return a random item from data
app.get("/random", (req, res) => {
  const findIndex = Math.floor(Math.random() * data.length);
  const randomData = data[findIndex];
  res.json(randomData);
});

// POST /create - add a new task to data
app.post("/create", (req, res) => {
  const newTask = req.body;
  const newId = Date.now().toString(); // Unique ID based on timestamp
  newTask.taskID = newId;
  data.push(newTask);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2)); // Save updated data
  res.send("You did a great job! Task created successfully.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
