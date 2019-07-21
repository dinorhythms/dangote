import express from 'express';
import roomController from '../controllers/roomController';
import { hrRouteAuth } from '../middlewares/auth';
import { signupValidator, validatorFn } from '../middlewares/validators'

const room = express.Router();

// @route   GET api/v1/room/:room_id
// @desc    User get room by id
// @access  Private
room.get('/', hrRouteAuth, roomController.index);

// @route   GET api/v1/room/:room_id
// @desc    User get room by id
// @access  Private
room.get('/:room_id', hrRouteAuth, roomController.roomById);

// @route   POST  api/v1/room/
// @desc    create room
// @access  Private
room.post('/', hrRouteAuth, roomController.create);

// @route   PATCH  api/v1/room/:room_id
// @desc    update room
// @access  Private
room.patch('/:room_id', hrRouteAuth, roomController.update);

// @route   DELETE  api/v1/room/:room_id
// @desc    delete room
// @access  Private
room.delete('/:room_id', hrRouteAuth, roomController.delete);

export default room;