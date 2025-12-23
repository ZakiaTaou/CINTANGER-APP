import sequelize from '../config/database.js';

// Import des modèles
import Movie from './Movie.js';
import Room from './Room.js';
import Screening from './Screening.js';
import Booking from './Booking.js';
import User from './User.js';

// Définition des relations entre les modèles

/* Un film peut avoir plusieurs séances */
Movie.hasMany(Screening, {
  foreignKey: 'movieId',
  as: 'screenings',
  onDelete: 'CASCADE',
});

/* Une séance appartient à un film */
Screening.belongsTo(Movie, {
  foreignKey: 'movieId',
  as: 'movie',
});

/* Une salle peut accueillir plusieurs séances */
Room.hasMany(Screening, {
  foreignKey: 'roomId',
  as: 'screenings',
  onDelete: 'CASCADE',
});

/* Une séance se déroule dans une salle */
Screening.belongsTo(Room, {
  foreignKey: 'roomId',
  as: 'room',
});

/* Une séance peut avoir plusieurs réservations */
Screening.hasMany(Booking, {
  foreignKey: 'screeningId',
  as: 'bookings',
  onDelete: 'CASCADE',
});

/* Une réservation est liée à une séance */
Booking.belongsTo(Screening, {
  foreignKey: 'screeningId',
  as: 'screening',
});

/* Un utilisateur peut effectuer plusieurs réservations */
User.hasMany(Booking, {
  foreignKey: 'userId',
  as: 'bookings',
  onDelete: 'CASCADE',
});

/* Une réservation appartient à un utilisateur */
Booking.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

/* Export de Sequelize et des modèles */
export {
  sequelize,
  Movie,
  Room,
  Screening,
  Booking,
  User,
};
