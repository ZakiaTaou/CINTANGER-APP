import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Room = sequelize.define('Room', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  capacity: DataTypes.INTEGER,
  screenType: DataTypes.STRING,
  has3D: DataTypes.BOOLEAN,
  hasDolbyAtmos: DataTypes.BOOLEAN,
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
})

export default Room
