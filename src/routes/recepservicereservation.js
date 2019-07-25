import express from 'express';
import serviceController from '../controllers/serviceController';
import { receptionistRouteAuth } from '../middlewares/auth';

const recepservicereservation = express.Router();

recepservicereservation.use(receptionistRouteAuth);
/**
@route   GET api/v1/reservation/:reservation_id
@desc    User get reservation by id
@access  Private
**/
recepservicereservation.get('/', serviceController.recepAll);

// @route   GET api/v1/reservation/:user/:service_id
// @desc    User get reservation by id
// @access  Private
recepservicereservation.get('/:service_reservation_id', serviceController.recepById);

// @route   PATCH  api/v1/reservation/:service_reservation_id
// @desc    update reservation
// @access  Private
recepservicereservation.patch('/:service_reservation_id', serviceController.recepUpdate);

export default recepservicereservation;