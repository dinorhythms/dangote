import express from 'express';
import serviceController from '../controllers/serviceController';
import { serviceRouteAuth } from '../middlewares/auth';

const staffservicereservation = express.Router();

staffservicereservation.use(serviceRouteAuth);
/**
@route   GET api/v1/reservation/:reservation_id
@desc    User get reservation by id
@access  Private
**/
staffservicereservation.get('/', serviceController.serviceStaffAll);

// @route   GET api/v1/reservation/:user/:service_id
// @desc    User get reservation by id
// @access  Private
staffservicereservation.get('/:service_reservation_id', serviceController.serviceStaffById);

// @route   PATCH  api/v1/reservation/:service_reservation_id
// @desc    update reservation
// @access  Private
staffservicereservation.patch('/:service_reservation_id', serviceController.serviceStaffUpdate);

export default staffservicereservation;