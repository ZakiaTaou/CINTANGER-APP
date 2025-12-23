import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  bookingNumber: DataTypes.STRING,
  totalPrice: DataTypes.FLOAT,
  seatCount: DataTypes.INTEGER,
  seats: DataTypes.ARRAY(DataTypes.STRING),
  status: DataTypes.STRING,
  qrCode: DataTypes.STRING,
  bookedAt: DataTypes.DATE,
  cancelledAt: DataTypes.DATE,
}, {
  timestamps: true,
})

export default Booking
