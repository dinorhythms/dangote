import '@babel/polyfill';
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import v1 from './routes/index';

dotenv.config();

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors
app.use(cors());

app.use('/api/v1', v1);

app.use('/notFound',(req,res)=>res.send("Not found"))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    if(err.status == 404)   res.redirect('/notFound')
})

// port
const port = parseInt(process.env.PORT, 10) || 4000;

if(!module.parent){ 
    app.listen(port, () => console.log(`Live at ${port}`));
}
  
export default app;