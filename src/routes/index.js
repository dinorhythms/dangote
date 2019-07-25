import express from 'express';

import auth from './auth';
import department from './department';
import staff from './staff';
import roomType from './roomType';
import room from './room';
import serviceType from './serviceType';
import service from './service';
import reservation from './reservation';
import hrreservation from './hrreservation';
import receptionreservation from './receptionreservation';
import servicereservation from './servicereservation';
import recepservicereservation from './recepservicereservation';
import staffservicereservation from './staffservicereservation';

const v1 = express.Router();

v1.use('/auth', auth);
v1.use('/department', department);
v1.use('/staff', staff);
v1.use('/roomtype', roomType);
v1.use('/room', room);
v1.use('/servicetype', serviceType);
v1.use('/service', service);
v1.use('/servicereservation', servicereservation);
v1.use('/reservation', reservation);
v1.use('/hrreservation', hrreservation);
v1.use('/receptionreservation', receptionreservation);
v1.use('/recepservicereservation', recepservicereservation);
v1.use('/staffservicereservation', staffservicereservation);

export default v1;