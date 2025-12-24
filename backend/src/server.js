import express from "express";
import cors from "cors";
import { connectionDb } from "./config/database.js";
import "./models/index.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API CinéTanger OK 🎬");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  connectionDb();

  console.log(`Server running on port ${PORT}`);
});
