import { Booking, Screening, User } from '../models/index.js';

/**
 * Créer une réservation
 */
export const createBooking = async (req, res) => {
  try {
    const { screeningId, userId, seatCount, seats } = req.body;

    const screening = await Screening.findByPk(screeningId);
    if (!screening) {
      return res.status(404).json({ message: 'Screening not found' });
    }

    if (screening.availableSeats < seatCount) {
      return res.status(400).json({ message: 'Not enough available seats' });
    }

    const booking = await Booking.create({
      screeningId,
      userId,
      seatCount,
      seats,
      totalPrice: seatCount * screening.price,
      status: 'CONFIRMED',
      bookedAt: new Date(),
    });

    // Mise à jour des places disponibles
    screening.availableSeats -= seatCount;
    await screening.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
};

/**
 * Récupérer une réservation par ID
 */
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: ['user', 'screening'],
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking' });
  }
};

/**
 * Récupérer les réservations d’un utilisateur
 */
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.params.userId },
      include: ['screening'],
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user bookings' });
  }
};

/**
 * Annuler une réservation
 */
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: ['screening'],
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = 'CANCELLED';
    booking.cancelledAt = new Date();
    await booking.save();

    // Rendre les places
    booking.screening.availableSeats += booking.seatCount;
    await booking.screening.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking' });
  }
};
