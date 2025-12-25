import express from "express";
import cors from "cors";
import { connectionDb } from "./config/database.js";
import "./models/index.js";
import movieRoutes from "./routes/movie.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import screeningRoutes from "./routes/screening.routes.js";
import { seedDatabase } from './seeders/seed.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API CinéTanger OK 🎬");
});


app.use('/api/movies',movieRoutes)
app.use('/api/bookings',bookingRoutes)
app.use('/api/screenings',screeningRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectionDb();
  // await sequelize.sync({ force: false, alter: false });
  await seedDatabase();

  console.log(`Server running on port ${PORT}`);
});
