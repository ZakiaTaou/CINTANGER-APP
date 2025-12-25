import { sequelize, Booking, Screening } from '../models/index.js';

/**
 * Créer une réservation avec gestion sécurisée des places
 */
export const createBookingWithSeats = async ({
  userId,
  screeningId,
  seatCount,
  seats,
}) => {
  return sequelize.transaction(async (transaction) => {
    // Récupérer la séance avec verrouillage
    const screening = await Screening.findByPk(screeningId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!screening) {
      throw new Error('SCREENING_NOT_FOUND');
    }

    if (seatCount <= 0) {
      throw new Error('INVALID_SEAT_COUNT');
    }

    if (screening.availableSeats < seatCount) {
      throw new Error('NOT_ENOUGH_SEATS');
    }

    // Créer la réservation
    const booking = await Booking.create(
      {
        userId,
        screeningId,
        seatCount,
        seats,
        totalPrice: seatCount * screening.price,
        status: 'CONFIRMED',
        bookedAt: new Date(),
      },
      { transaction }
    );

    // Mettre à jour les places
    screening.availableSeats -= seatCount;
    await screening.save({ transaction });

    return booking;
  });
};

/**
 * Annuler une réservation et rendre les places
 */
export const cancelBookingWithSeats = async (bookingId) => {
  return sequelize.transaction(async (transaction) => {
    const booking = await Booking.findByPk(bookingId, {
      include: ['screening'],
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!booking) {
      throw new Error('BOOKING_NOT_FOUND');
    }

    if (booking.status === 'CANCELLED') {
      throw new Error('BOOKING_ALREADY_CANCELLED');
    }

    // Rendre les places
    booking.screening.availableSeats += booking.seatCount;
    await booking.screening.save({ transaction });

    // Mettre à jour la réservation
    booking.status = 'CANCELLED';
    booking.cancelledAt = new Date();
    await booking.save({ transaction });

    return booking;
  });
};
