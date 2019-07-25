import express from 'express';
import serviceController from '../controllers/serviceController';
import { hrRouteAuth } from '../middlewares/auth';

const hrservicereservation = express.Router();

hrservicereservation.use(hrRouteAuth);
/**
@route   GET api/v1/reservation/:reservation_id
@desc    User get reservation by id
@access  Private
**/
hrservicereservation.get('/', serviceController.hrAll);

// @route   GET api/v1/reservation/:user/:service_id
// @desc    User get reservation by id
// @access  Private
hrservicereservation.get('/:service_reservation_id', serviceController.hrById);

// @route   PATCH  api/v1/reservation/:service_reservation_id
// @desc    update reservation
// @access  Private
hrservicereservation.patch('/:service_reservation_id', serviceController.hrUpdate);

export default hrservicereservation;