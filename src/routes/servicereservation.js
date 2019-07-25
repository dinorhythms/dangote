import express from 'express';
import serviceController from '../controllers/serviceController';
import { guestRouteAuth } from '../middlewares/auth';

const servicereservation = express.Router();
/**
@route   GET api/v1/reservation/:reservation_id
@desc    User get reservation by id
@access  Private
**/
servicereservation.get('/', guestRouteAuth, serviceController.guestAll);

// @route   GET api/v1/reservation/:user/:service_id
// @desc    User get reservation by id
// @access  Private
servicereservation.get('/:service_id', guestRouteAuth, serviceController. guestById);

// @route   POST  api/v1/reservation/
// @desc    create reservation
// @access  Private
servicereservation.post('/', guestRouteAuth, serviceController.guestBooking);

// @route   PATCH  api/v1/reservation/:service_reservation_id
// @desc    update reservation
// @access  Private
servicereservation.patch('/:service_reservation_id', guestRouteAuth, serviceController.guestUpdate);

export default servicereservation;