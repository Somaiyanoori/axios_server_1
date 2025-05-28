// Import required modules
import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set EJS as view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views")); // Make sure your views folder exists

// Root route
app.get("/", (req, res) => {
  res.render("index");
});

// Route for get or create form
app.get("/form/:action", async (req, res) => {
  const action = req.params.action;

  if (action === "get") {
    try {
      const response = await axios.get(
        "https://axios-server-1-2.onrender.com/random"
      );
      const result = response.data;
      res.render("getTask", { task: result });
    } catch (error) {
      console.error("Failed to fetch task:", error.message);
      res.render("index", { error: error.message });
    }
  } else {
    res.render("create");
  }
});
app.post("/createTask", async (req, res) => {
  const newTask = req.body;

  try {
    const response = await axios.post(
      "https://axios-server-1-2.onrender.com/create",
      newTask
    );

    if (response.status === 200) {
      res.render("index", { success: "Task created successfully!" });
    } else {
      throw new Error("Failed to create task");
    }
  } catch (error) {
    console.error("Failed to create task:", error.message);
    res.status(500).send(`Error creating task: ${error.message}`);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
