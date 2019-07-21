import express from 'express';
import roomTypeController from '../controllers/roomTypeController';
import { hrRouteAuth } from '../middlewares/auth';

const roomType = express.Router();

// @route   GET api/v1/roomType/:roomType_id
// @desc    User get roomType by id
// @access  Private
roomType.get('/', hrRouteAuth, roomTypeController.index);

// @route   GET api/v1/roomType/:roomType_id
// @desc    User get roomType by id
// @access  Private
roomType.get('/:roomType_id', hrRouteAuth, roomTypeController.roomTypeById);

// @route   POST  api/v1/roomType/
// @desc    create roomType
// @access  Private
roomType.post('/', hrRouteAuth, roomTypeController.create);

// @route   PATCH  api/v1/roomType/:roomType_id
// @desc    update roomType
// @access  Private
roomType.patch('/:roomType_id', hrRouteAuth, roomTypeController.update);

// @route   DELETE  api/v1/roomType/:roomType_id
// @desc    delete roomType
// @access  Private
roomType.delete('/:roomType_id', hrRouteAuth, roomTypeController.delete);

export default roomType;