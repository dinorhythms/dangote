import express from 'express';
import reservationController from '../controllers/reservationController';
import { receptionistRouteAuth } from '../middlewares/auth';

const receptionreservation = express.Router();
receptionreservation.use(receptionistRouteAuth)

// @route   GET api/v1/receptionreservation/
// @desc    reception get reservation
// @access  Private
receptionreservation.get('/', reservationController.recepAll);

// @route   GET api/v1/receptionreservation/:reservation_id
// @desc    reception get reservation by id
// @access  Private
receptionreservation.get('/:reservation_id', reservationController.recepById);

// @route   PATCH  api/v1/receptionreservation/
// @desc    update reservation
// @access  Private
receptionreservation.patch('/process/:reservation_id', reservationController.recepProcess);

// @route   PATCH  api/v1/receptionreservation/
// @desc    update reservation
// @access  Private
receptionreservation.patch('/checkout/:reservation_id', reservationController.recepCheckout);

export default receptionreservation;