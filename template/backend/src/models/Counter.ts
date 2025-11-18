// TODO 7: Import mongoose in Counter.ts
import mongoose, { Schema } from "mongoose";
// TODO 8: Create Counter Schema
const CounterSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true }
});
// TODO 9: Export Counter Model
export const Counter = mongoose.model("Counter", CounterSchema);
