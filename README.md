Here is your **fully rewritten Week 4 README**, now with the **correct renumbered TODOs** matching your intended teaching sequence.

This version is clean, consistent with your Week 3 style, beginner friendly, and easy for students to follow step by step.

No dashes in sentences.
No emojis.
Forward thinking and direct.

---

# Cohorts Week 4: Counter App Backend

Clone the starter backend project

```
git clone https://github.com/CSES-Open-Source/cohorts-week-4-backend.git
```

This week you will build a backend using Express, TypeScript, and MongoDB.
You will create a schema, API routes, and connect your React app to your backend using axios.

---

# PREREQUISITES

## Node.js and npm

You need Node.js v18 or higher.

Check your version

```
node -v
```

If you have something like v20.11.1, continue.

If not, install Node using the instructions below.

---

### macOS Example

1. Install Node using Homebrew

```
brew install node
```

2. Verify installation

```
node -v
npm -v
```

Alternative
Download the LTS installer from [https://nodejs.org](https://nodejs.org)

---

### Windows Example

1. Download the LTS installer from [https://nodejs.org](https://nodejs.org)
2. Run the installer and keep Add to PATH enabled
3. Verify installation

```
node -v
npm -v
```

Optional for advanced users

```
choco install nodejs-lts
```

---

# SETUP: Using MongoDB Atlas (Recommended)

MongoDB Atlas is a cloud database.
It removes the need to install MongoDB locally, which avoids most setup errors.
Follow these steps to create your first cluster.

---

## Step 1: Create an Atlas Account

1. Visit
   [https://www.mongodb.com/atlas/database](https://www.mongodb.com/atlas/database)

2. Click “Try Free”

3. Sign in with Google or email

You will land in the **Atlas dashboard**.

---

## Step 2: Create a Free Cluster

1. Click “Deploy a New Cluster”
2. Choose
   • Provider: **AWS**
   • Region: any region near you
3. Select “Free Cluster” tier
4. Click “Create Cluster”

Atlas will take a few minutes to create it.

---

## Step 3: Add a Database User

Atlas needs a username/password for your backend to connect.

1. Go to **Database Access** tab

2. Click “Add New Database User”

3. Choose:
   • Username: anything (example: `admin`)
   • Password: create one and save it

4. Set “Database User Privileges” to
   **Read and Write to Any Database**

5. Click “Add User”

---

## Step 4: Add Your IP Address

This step lets your local computer talk to Atlas.

1. Go to **Network Access** tab

2. Click “Add IP Address”

3. Click “Allow Access from Anywhere”
   This adds `0.0.0.0/0`
   (Easy for development)

4. Save

---

## Step 5: Get Your Connection String

1. Go to the **Clusters** page
2. Click “Connect” on your cluster
3. Choose “Connect using your application”
4. Copy this connection string:

```
mongodb+srv://<username>:<password>@<clustername>.mongodb.net/counter
```

Replace `<username>` and `<password>` with your actual values.

---

## Step 6: Update index.ts

Inside your backend

```ts
mongoose
  .connect("YOUR_ATLAS_CONNECTION_STRING")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));
```

Be sure to specify the database name, for example:

```
mongodb+srv://admin:mypassword@cluster0.a1b2c3.mongodb.net/counter
```
---
### Step 7: Replace Default Files

We’ll now copy over your prepared files from
root/template/ into the new full-stack project.

Make sure you’re still inside root/, then run:
```
mkdir -p your-name
cp -r ./template/* your-name/
```

This will copy the necessary files into your `src/` directory.

---

---

# Phase 0: Seed Script

Open src/seed.ts

### TODO 0: Edit MongoDB connection string

```ts
await mongoose.connect("YOUR_ATLAS_CONNECTION_STRING");
```

Run

```
npm run seed
```

Your database will now contain sample counters.

Description: The seed script populates the database with sample counters so you have data to work with while developing. Editing the connection string tells the script which database (your Atlas cluster) to connect to before inserting data.

---

# Phase 1: Basic Express Server

### TODO 1: Import express and cors

```ts
import express from "express";
import cors from "cors";
```

Description: Express is a minimal web framework for Node.js used to define routes and middleware. The `cors` package enables Cross-Origin Resource Sharing so your frontend (running on a different port) can call the backend.

### TODO 2: Create express app and define PORT

```ts
const app = express();
const PORT = 3000;
```

Description: `app` is the Express application object — think of it as the main server instance. `PORT` is the TCP port the server listens on

### TODO 3: Middleware to parse JSON

```ts
app.use(express.json());
```

Description: Middleware runs for incoming requests before route handlers. `express.json()` parses JSON request bodies and makes the data available on `req.body`.

### TODO 4: Add a simple root route

```ts
app.get("/", (_req, res) => {
  res.send("Hello World");
});
```

Description: A route maps an HTTP method and path (here GET /) to a handler function that receives a request and sends a response. This simple route confirms the server is running.

### TODO 5: Start the server

```ts
app.listen(PORT, () => {
  console.log("Server listening on http://localhost:" + PORT);
});
```

Description: `listen` starts the server and begins accepting network requests. The callback runs once the server is ready.

At this point you can visit
[http://localhost:3000](http://localhost:3000)
and see Hello World.

Try calling this route from your frontend.
It will fail due to CORS.

This is intentional.

---

# Phase 2: Fixing CORS

### TODO 6: Enable CORS for frontend application

```ts
app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
```

Description: CORS (Cross-Origin Resource Sharing) is a browser security feature that blocks requests from different origins by default. Allowing the frontend origin tells the backend which web pages are permitted to call it.

Try calling your backend from React again.
It now works.

---

# Phase 3: Connect to MongoDB

### TODO 7: Import mongoose

```ts
import mongoose from "mongoose";
```

Description: Mongoose is an Object Data Modeling (ODM) library that provides a schema-based solution to model application data for MongoDB. It makes working with MongoDB from Node.js easier by adding validation and helpful methods.

### TODO 8: Connect to database

```ts
mongoose
  .connect("mongodb://127.0.0.1:27017/counter")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));
```

Description: Connecting establishes a network connection to your MongoDB server (local or Atlas). The connection string tells the driver where the database is and which database name to use.

---

# Phase 4: Create the Counter Model

Open src/models/Counter.ts

### TODO 9: Import mongoose in Counter.ts

```ts
import mongoose, { Schema } from "mongoose";
```

Description: A Schema defines the shape of documents in a MongoDB collection (fields, types, and validation). Importing `Schema` lets you create that structure.

### TODO 10: Create Counter Schema

```ts
const CounterSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true }
});
```

Description: The schema lists the fields stored for each counter and any validation rules (for example, `required`). Think of it as a blueprint for counter documents.

### TODO 11: Export Counter Model

```ts
export const Counter = mongoose.model("Counter", CounterSchema);
```

Description: A model is a constructor compiled from the schema — it provides methods like `find`, `create`, and `findByIdAndUpdate`. Exporting it makes the model available to other files.

---

# Phase 5: Create Backend Routes

Open src/routes/counter.ts

### TODO 12: Import necessary modules

```ts
import { Router, Request, Response } from "express";
import { Counter } from "../models/Counter";
```

Description: `Router` is an Express feature that lets you group related routes together (a mini-app). `Request` and `Response` are types describing the incoming HTTP request and outgoing response.

### TODO 13: Create a new router instance

```ts
const router = Router();
```

Description: A router instance is like a sub-application you can mount on a path. It helps organize routes for a specific resource (here, counters).

### TODO 14: Add a GET route to fetch all counters

```ts
router.get("/", async (_req: Request, res: Response) => {
  const counters = await Counter.find();
  res.json(counters);
});
```

Description: GET requests are used to read data. This route returns the list of counters as JSON.

### TODO 15: Add a POST route to create a new counter

```ts
router.post("/", async (req, res) => {
  const { name } = req.body;
  const counter = await Counter.create({ name, value: 0 });
  res.json(counter);
});
```

Description: POST requests create new resources. Here the server reads the `name` from the request body and inserts a new counter document.

### TODO 16: Add a PATCH route to update a counter by ID

```ts
router.patch("/:id", async (req: Request, res: Response) => {
  const { newValue } = req.body;

  const updated = await Counter.findByIdAndUpdate(
    req.params.id,
    { value: newValue },
    { new: true }
  );

  res.json(updated);
});
```

Description: PATCH requests make partial updates to existing resources. This route updates the `value` of a counter with the given ID and returns the updated document.

### TODO 17: Add a DELETE route to remove a counter by ID

```ts
router.delete("/:id", async (req: Request, res: Response) => {
  await Counter.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});
```

Description: DELETE requests remove resources. After deleting the counter, the server responds with status 204 (No Content) to indicate success without a body.

### TODO 18: Export router as default

```ts
export default router;
```

Description: `export default` makes this router the module's primary export. When another file imports it, it can choose any name for the imported value (for example: `import counterRoutes from "./routes/counter"`).

---

# Phase 6: Connect Routes to Server

Back in src/index.ts

### TODO 19: Import counter routes

```ts
import counterRoutes from "./routes/counter";
```

Description: Importing the router lets you mount the grouped routes on a path (next step). This connects the counters API implementation to the main server.

### TODO 20: Use counter routes

```ts
app.use("/counters", counterRoutes);
```

Description: `app.use` mounts the router at `/counters`, so requests to paths like `/counters/` and `/counters/:id` are handled by the router defined earlier.

---

# Phase 7: Frontend API Helpers

### TODO 21: Import axios

```ts
import axios from "axios";
```

Description: Axios is a popular HTTP client for the browser and Node.js. It simplifies making HTTP requests (GET/POST/PATCH/DELETE) and handles promises.

### TODO 22: Create axios instance

```ts
const api = axios.create({
  baseURL: "http://localhost:3000/counters"
});
```

Description: Creating an axios instance sets a shared base URL and configuration for all API calls. This keeps your client code concise (you only call relative paths).

### TODO 23: Create loadCounters with api.get

```ts
export async function loadCounters() {
  const res = await api.get("/");
  return res.data;
}
```

Description: `api.get` performs a GET request to fetch data. The function returns the response body (`res.data`) which contains the counters array.

### TODO 24: Create addCounter with api.post

```ts
export async function addCounter(name: string) {
  const res = await api.post("/", { name });
  return res.data;
}
```

Description: `api.post` sends data to create a new resource. The server will return the created counter; this helper returns that new object to the caller.

### TODO 25: Create updateCounter with api.patch

```ts
export async function updateCounter(id: string, newValue: number) {
  const res = await api.patch(`/${id}`, { newValue });
  return res.data;
}
```

Description: `api.patch` performs a partial update on a resource. Here we send `newValue` which the server uses to update the counter's value.

### TODO 26: Create deleteCounter with api.delete

```ts
export async function deleteCounter(id: string) {
  await api.delete(`/${id}`);
}
```

Description: `api.delete` removes a resource on the server. The helper doesn't return data because the server responds with 204 No Content.

---



# Uploading Your Work

Add your changes

```
git add .
```

Commit your work

```
git commit -m "Complete Week 4 backend"
```

Push to GitHub

```
git push origin main
```
