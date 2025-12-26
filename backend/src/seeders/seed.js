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
      title: "Cargo",
      description:
        "In a post-apocalyptic Australia, a father searches for someone to protect his infant daughter after being infected by a deadly virus.",
      duration: 105,
      genre: "Drama / Thriller",
      releaseDate: new Date("2017-10-06"),
      posterUrl:
        "https://i.pinimg.com/1200x/02/12/b4/0212b4a89dc44f6cf134af4a4d13f156.jpg",
      rating: 4.1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Connect",
      description:
        "A family experiences terrifying paranormal events during the COVID-19 lockdown after attempting a virtual exorcism through a video call.",
      duration: 99,
      genre: "Horror / Thriller",
      releaseDate: new Date("2022-12-22"),
      posterUrl:
        "https://i.pinimg.com/1200x/57/bc/02/57bc02a03e342cf75a58a2f518908437.jpg",
      rating: 3.9,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Every Time I Die",
      description:
        "After a fatal accident, a man's consciousness mysteriously transfers into the body of his best friend, leading to a disturbing struggle for control.",
      duration: 98,
      genre: "Thriller / Mystery",
      releaseDate: new Date("2019-10-01"),
      posterUrl:
        "https://i.pinimg.com/1200x/56/ed/04/56ed04636a904a32f9596186315f8cd7.jpg",
      rating: 3.8,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Divergent",
      description:
        "In a dystopian future, a young woman discovers she is Divergent—someone who doesn’t fit into any single faction—and becomes the key to uncovering a dangerous conspiracy.",
      duration: 139,
      genre: "Sci-Fi / Action / Adventure",
      releaseDate: new Date("2014-03-21"),
      posterUrl:
        "https://i.pinimg.com/1200x/59/cc/21/59cc2123d71f313a47d38de6b8833d84.jpg",
      rating: 4.2,
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
  // 🎬 Cargo
  {
    movieId: movies[0].id,
    roomId: rooms[0].id,
    startTime: new Date("2025-01-01T15:00:00"),
    endTime: new Date("2025-01-01T17:00:00"),
    price: 50,
    totalSeats: rooms[0].capacity,
    availableSeats: rooms[0].capacity,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    movieId: movies[0].id,
    roomId: rooms[1].id,
    startTime: new Date("2025-01-02T18:00:00"),
    endTime: new Date("2025-01-02T20:00:00"),
    price: 40,
    totalSeats: rooms[1].capacity,
    availableSeats: rooms[1].capacity,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // 🎬 Connect
  {
    movieId: movies[1].id,
    roomId: rooms[1].id,
    startTime: new Date("2025-01-01T21:00:00"),
    endTime: new Date("2025-01-01T22:40:00"),
    price: 45,
    totalSeats: rooms[1].capacity,
    availableSeats: rooms[1].capacity,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    movieId: movies[1].id,
    roomId: rooms[0].id,
    startTime: new Date("2025-01-03T19:00:00"),
    endTime: new Date("2025-01-03T20:40:00"),
    price: 55,
    totalSeats: rooms[0].capacity,
    availableSeats: rooms[0].capacity,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // 🎬 Every Time I Die
  {
    movieId: movies[2].id,
    roomId: rooms[1].id,
    startTime: new Date("2025-01-02T16:00:00"),
    endTime: new Date("2025-01-02T17:40:00"),
    price: 42,
    totalSeats: rooms[1].capacity,
    availableSeats: rooms[1].capacity,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // 🎬 Divergent
  {
    movieId: movies[3].id,
    roomId: rooms[0].id,
    startTime: new Date("2025-01-02T20:00:00"),
    endTime: new Date("2025-01-02T22:30:00"),
    price: 60,
    totalSeats: rooms[0].capacity,
    availableSeats: rooms[0].capacity,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    movieId: movies[3].id,
    roomId: rooms[0].id,
    startTime: new Date("2025-01-04T17:00:00"),
    endTime: new Date("2025-01-04T19:30:00"),
    price: 60,
    totalSeats: rooms[0].capacity,
    availableSeats: rooms[0].capacity,
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
