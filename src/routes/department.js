import express from 'express';
import departmentController from '../controllers/departmentController';
import { hrRouteAuth } from '../middlewares/auth';

const department = express.Router();

// @route   GET api/v1/department/:department_id
// @desc    User get department by id
// @access  Private
department.get('/', hrRouteAuth, departmentController.index);

// @route   GET api/v1/department/:department_id
// @desc    User get department by id
// @access  Private
department.get('/:department_id', hrRouteAuth, departmentController.deptById);

// @route   POST  api/v1/department/
// @desc    create department
// @access  Private
department.post('/', hrRouteAuth, departmentController.create);

// @route   PATCH  api/v1/department/:department_id
// @desc    update department
// @access  Private
department.patch('/:department_id', hrRouteAuth, departmentController.update);

// @route   DELETE  api/v1/department/:department_id
// @desc    delete department
// @access  Private
department.delete('/:department_id', hrRouteAuth, departmentController.delete);

export default department;