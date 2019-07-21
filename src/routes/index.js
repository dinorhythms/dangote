import express from 'express';

import auth from './auth';
import department from './department';
import staff from './staff';

const v1 = express.Router();

v1.use('/auth', auth);
v1.use('/department', department);
v1.use('/staff', staff);

export default v1;