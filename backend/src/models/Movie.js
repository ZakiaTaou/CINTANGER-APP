import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  duration: DataTypes.INTEGER,
  genre: DataTypes.STRING,
  releaseDate: DataTypes.DATE,
  posterUrl: DataTypes.STRING,
  trailerUrl: DataTypes.STRING,
  rating: DataTypes.FLOAT,
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
})

export default Movie;
