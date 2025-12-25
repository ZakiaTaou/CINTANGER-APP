import {
  sequelize,
  Movie,
  Room,
  Screening,
  User,
  Booking,
} from "../models/index.js";
import bcrypt from "bcrypt";

export async function seedDatabase() {
  const movieCount = await Movie.count();
  if (movieCount > 0) {
    console.log("🌱 Database already seeded");
    return;
  }

  console.log("🌱 Cleaning tables...");
  await Booking.destroy({ where: {}, truncate: true, cascade: true });
  await User.destroy({ where: {}, truncate: true, cascade: true });
  await Screening.destroy({ where: {}, truncate: true, cascade: true });
  await Movie.destroy({ where: {}, truncate: true, cascade: true });
  await Room.destroy({ where: {}, truncate: true, cascade: true });

  console.log("🌱 Seeding database...");

  const movies = await Movie.bulkCreate([
    {
      title: "Inception",
      description: "A mind-bending thriller",
      duration: 148,
      genre: "Sci-Fi",
      releaseDate: new Date("2010-07-16"),
      posterUrl: "https://example.com/inception.jpg",
      rating: 4.8,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Interstellar",
      description: "Space and time exploration",
      duration: 169,
      genre: "Sci-Fi",
      releaseDate: new Date("2014-11-07"),
      posterUrl: "https://example.com/interstellar.jpg",
      rating: 4.9,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const rooms = await Room.bulkCreate([
    {
      name: "Room A",
      capacity: 120,
      screenType: "IMAX",
      has3D: true,
      hasDolbyAtmos: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Room B",
      capacity: 80,
      screenType: "Standard",
      has3D: false,
      hasDolbyAtmos: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const screenings = await Screening.bulkCreate([
    {
      movieId: movies[0].id,
      roomId: rooms[0].id,
      startTime: new Date("2025-01-01T18:00:00"),
      endTime: new Date("2025-01-01T20:30:00"),
      price: 50,
      totalSeats: rooms[0].capacity,
      availableSeats: rooms[0].capacity,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      movieId: movies[1].id,
      roomId: rooms[1].id,
      startTime: new Date("2025-01-01T21:00:00"),
      endTime: new Date("2025-01-01T23:50:00"),
      price: 45,
      totalSeats: rooms[1].capacity,
      availableSeats: rooms[1].capacity,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const users = await User.bulkCreate([
    {
      firstName: "Zakia",
      email: "zakia@test.com",
      passwordHash: await bcrypt.hash("password123", 10), // matches model
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: "Admin",
      email: "admin@test.com",
      passwordHash: await bcrypt.hash("admin123", 10), // matches model
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  await Booking.bulkCreate([
    {
      bookingNumber: "BK-001",
      totalPrice: 100,
      seatCount: 2,
      seats: ["A1", "A2"],
      status: "CONFIRMED",
      qrCode: "QR123456",
      bookedAt: new Date(),
      screeningId: screenings[0].id,
      userId: users[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  console.log("✅ Seeding completed");
}
