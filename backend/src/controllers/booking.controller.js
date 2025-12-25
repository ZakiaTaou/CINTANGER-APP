import { Booking } from '../models/index.js';
import {
  createBookingWithSeats,
  cancelBookingWithSeats,
} from '../services/booking.service.js';

/**
 * POST /bookings
 */
export const createBooking = async (req, res) => {
  try {
    const booking = await createBookingWithSeats(req.body);
    return res.status(201).json(booking);
  } catch (error) {
    if (error.message === 'SCREENING_NOT_FOUND') {
      return res.status(404).json({ message: 'Screening not found' });
    }
    if (error.message === 'NOT_ENOUGH_SEATS') {
      return res.status(400).json({ message: 'Not enough available seats' });
    }
    if (error.message === 'INVALID_SEAT_COUNT') {
      return res.status(400).json({ message: 'Invalid seat count' });
    }
    return res.status(500).json({ message: 'Error creating booking' });
  }
};

/**
 * GET /bookings/:id
 */
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: ['user', 'screening'],
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.json(booking);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching booking' });
  }
};

/**
 * GET /bookings/user/:userId
 */
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.params.userId },
      include: ['screening'],
      order: [['createdAt', 'DESC']],
    });

    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching user bookings' });
  }
};

/**
 * PATCH /bookings/:id/cancel
 */
export const cancelBooking = async (req, res) => {
  try {
    const booking = await cancelBookingWithSeats(req.params.id);
    return res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    if (error.message === 'BOOKING_NOT_FOUND') {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (error.message === 'BOOKING_ALREADY_CANCELLED') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }
    return res.status(500).json({ message: 'Error cancelling booking' });
  }
};
