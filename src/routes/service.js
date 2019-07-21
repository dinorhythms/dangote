import express from 'express';
import serviceController from '../controllers/serviceController';
import { hrRouteAuth } from '../middlewares/auth';

const service = express.Router();

// @route   GET api/v1/service/:service_id
// @desc    User get service by id
// @access  Private
service.get('/', hrRouteAuth, serviceController.index);

// @route   GET api/v1/service/:service_id
// @desc    User get service by id
// @access  Private
service.get('/:service_id', hrRouteAuth, serviceController.serviceById);

// @route   POST  api/v1/service/
// @desc    create service
// @access  Private
service.post('/', hrRouteAuth, serviceController.create);

// @route   PATCH  api/v1/service/:service_id
// @desc    update service
// @access  Private
service.patch('/:service_id', hrRouteAuth, serviceController.update);

// @route   DELETE  api/v1/service/:service_id
// @desc    delete service
// @access  Private
service.delete('/:service_id', hrRouteAuth, serviceController.delete);

export default service;