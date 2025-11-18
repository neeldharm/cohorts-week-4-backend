// TODO 10: Import necessary modules in routes/counter.ts
import { Router, Request, Response } from "express";
import { Counter } from "../models/Counter";
// TODO 11: Create a new router instance
const router = Router();
// TODO 12: Add a GET route to fetch all counters
router.get("/", async (_req: Request, res: Response) => {
  const counters = await Counter.find();
  res.json(counters);
});
// TODO 13: Add a POST route to create a new counter
router.post("/", async (req, res) => {
  const { name } = req.body;
  const counter = await Counter.create({ name, value: 0 });
  res.json(counter);
});
// TODO 14: Add a PATCH route to update a counter by ID
router.patch("/:id", async (req: Request, res: Response) => {
  const { newValue } = req.body;

  const updated = await Counter.findByIdAndUpdate(
    req.params.id,
    { value: newValue },
    { new: true }
  );

  res.json(updated);
});
// TODO 15: Add a DELETE route to remove a counter by ID
router.delete("/:id", async (req: Request, res: Response) => {
  await Counter.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});
// TODO 16: Export router as default
export default router;
