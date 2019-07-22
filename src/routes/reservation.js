import express from 'express';
import reservationController from '../controllers/reservationController';
import { guestRouteAuth} from '../middlewares/auth';

const reservation = express.Router();

// @route   GET api/v1/reservation/:reservation_id
// @desc    User get reservation by id
// @access  Private
reservation.get('/', guestRouteAuth, reservationController.index);

// @route   GET api/v1/reservation/:user/:reservation_id
// @desc    User get reservation by id
// @access  Private
reservation.get('/:reservation_id', guestRouteAuth, reservationController.byId);

// @route   POST  api/v1/reservation/
// @desc    create reservation
// @access  Private
reservation.post('/', guestRouteAuth, reservationController.create);

// @route   PATCH  api/v1/reservation/:reservation_id
// @desc    update reservation
// @access  Private
reservation.patch('/:reservation_id', guestRouteAuth, reservationController.update);

// @route   DELETE  api/v1/reservation/:reservation_id
// @desc    delete reservation
// @access  Private
reservation.delete('/:reservation_id', guestRouteAuth, reservationController.delete);

export default reservation;