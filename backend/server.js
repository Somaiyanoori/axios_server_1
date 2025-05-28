import express from "express";
import fs from "fs";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
app.get("/random", (req, res) => {
  const findIndex = Math.floor(Math.random() * data.length);
  const randomData = data[findIndex];

  res.json(randomData);
});
//create
app.post("/create", (req, res) => {
  const newTask = req.body;
  const newId = Date.now().toString();
  newTask.taskID = newId;
  data.push(newTask);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.send("You then great job");
});

app.listen(PORT, () => {
  console.log(`server is running on this PORT ${PORT}`);
});
