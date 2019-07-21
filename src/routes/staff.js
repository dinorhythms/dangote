import express from 'express';
import staffController from '../controllers/staffController';
import { hrRouteAuth } from '../middlewares/auth';
import { signupValidator, validatorFn } from '../middlewares/validators'

const staff = express.Router();

// @route   GET api/v1/staff/:staff_id
// @desc    User get staff by id
// @access  Private
staff.get('/', hrRouteAuth, staffController.index);

// @route   GET api/v1/staff/:staff_id
// @desc    User get staff by id
// @access  Private
staff.get('/:staff_id', hrRouteAuth, staffController.staffById);

// @route   POST  api/v1/staff/
// @desc    create staff
// @access  Private
staff.post('/', hrRouteAuth, [signupValidator, validatorFn], staffController.create);

// @route   PATCH  api/v1/staff/:staff_id
// @desc    update staff
// @access  Private
staff.patch('/:staff_id', hrRouteAuth, staffController.update);

// @route   DELETE  api/v1/staff/:staff_id
// @desc    delete staff
// @access  Private
staff.delete('/:staff_id', hrRouteAuth, staffController.delete);

export default staff;