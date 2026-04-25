import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employeeDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

const employeeSchema = new mongoose.Schema({
  name: String,
  skills: [String],
});

const Employee = mongoose.model("Employee", employeeSchema);

// GET
app.get("/employees", async (req, res) => {
  const data = await Employee.find();
  res.json(data);
});

// ADD
app.post("/employees", async (req, res) => {
  console.log("1️⃣ Request received");

  try {
    console.log("2️⃣ Body:", req.body);

    const newEmp = new Employee(req.body);

    console.log("3️⃣ Before save");

    await newEmp.save();

    console.log("4️⃣ After save");

    res.json(newEmp);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: "Failed" });
  }
});

// DELETE
app.delete("/employees/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE
app.put("/employees/:id", async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
  { returnDocument: "after" }
  );
  res.json(updated);
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});