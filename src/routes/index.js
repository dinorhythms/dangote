import express from 'express';

import auth from './auth';
import department from './department';
import staff from './staff';
import roomType from './roomType';
import room from './room';

const v1 = express.Router();

v1.use('/auth', auth);
v1.use('/department', department);
v1.use('/staff', staff);
v1.use('/roomtype', roomType);
v1.use('/room', room);

export default v1;