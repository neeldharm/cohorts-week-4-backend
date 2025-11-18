// TODO 1: Import express and cors
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import counterRoutes from "./routes/counter";


mongoose
  .connect("mongodb+srv://ndharm-db-user:Lidk1tammb@counter.mongodb.net/counter")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));
// TODO 2: Create express app and define PORT
const app = express();
const PORT = 3000;

// TODO 3: Middleware to parse JSON
app.use(express.json());
// TODO 4: Enable CORS for frontend application
app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server listening on http://localhost:" + PORT);
});
// TODO 5: Import mongoose
app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
// TODO 6: Connect to database
mongoose
  .connect("mongodb://127.0.0.1:27017/counter")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));
// TODO 17: Import counter routes in index.ts
app.use("/counters", counterRoutes);
// TODO 18: Add a simple root route
// TODO 19: Use counter routes
// TODO 20: Start the server
