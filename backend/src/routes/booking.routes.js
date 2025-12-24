import express from 'express';
import {
  createBooking,
  getBookingById,
  getUserBookings,
  cancelBooking,
} from '../controllers/booking.controller.js';

const router = express.Router();

/* Créer une réservation */
router.post('/', createBooking);

/* Récupérer une réservation */
router.get('/:id', getBookingById);

/* Récupérer les réservations d’un utilisateur */
router.get('/user/:userId', getUserBookings);

/* Annuler une réservation */
router.patch('/:id/cancel', cancelBooking);

export default router;
