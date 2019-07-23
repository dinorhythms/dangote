import express from 'express';
import reservationController from '../controllers/reservationController';
import { hrRouteAuth } from '../middlewares/auth';

const hrreservation = express.Router();

hrreservation.use(hrRouteAuth)
// @route   GET api/v1/reservation/:reservation_id
// @desc    User get reservation by id
// @access  Private
hrreservation.get('/', reservationController.hrAll);

// @route   GET api/v1/reservation/:reservation_id
// @desc    User get reservation by id
// @access  Private
hrreservation.get('/:reservation_id', reservationController.hrById);

// @route   POST  api/v1/reservation/
// @desc    create reservation
// @access  Private
hrreservation.patch('/process/:reservation_id', reservationController.process);

export default hrreservation;