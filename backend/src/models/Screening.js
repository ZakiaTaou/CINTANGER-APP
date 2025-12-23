import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Screening = sequelize.define('Screening', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: DataTypes.DATE,
  price: DataTypes.FLOAT,
  totalSeats: DataTypes.INTEGER,
  availableSeats: DataTypes.INTEGER,
}, {
  timestamps: true,
})

export default Screening
