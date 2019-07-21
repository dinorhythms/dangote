import express from 'express';
import serviceTypeController from '../controllers/serviceTypeController';
import { hrRouteAuth } from '../middlewares/auth';

const serviceType = express.Router();

// @route   GET api/v1/serviceType/:serviceType_id
// @desc    User get serviceType by id
// @access  Private
serviceType.get('/', hrRouteAuth, serviceTypeController.index);

// @route   GET api/v1/serviceType/:serviceType_id
// @desc    User get serviceType by id
// @access  Private
serviceType.get('/:serviceType_id', hrRouteAuth, serviceTypeController.serviceTypeById);

// @route   POST  api/v1/serviceType/
// @desc    create serviceType
// @access  Private
serviceType.post('/', hrRouteAuth, serviceTypeController.create);

// @route   PATCH  api/v1/serviceType/:serviceType_id
// @desc    update serviceType
// @access  Private
serviceType.patch('/:serviceType_id', hrRouteAuth, serviceTypeController.update);

// @route   DELETE  api/v1/serviceType/:serviceType_id
// @desc    delete serviceType
// @access  Private
serviceType.delete('/:serviceType_id', hrRouteAuth, serviceTypeController.delete);

export default serviceType;