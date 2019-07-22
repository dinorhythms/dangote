import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../models/userModel';

dotenv.config()

export function userRouteAuth(req, res, next) {

    const token  = req.headers.authorization.split(' ')[1];

    //check for token
    if (!token){
        res.status(401).json({ status: 'error', error: "No token, authorization denied" });
    } else {
        try {
            //verify token
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            //Add user from payload
            req.user = decoded;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(409).json({
                  status: 'error',
                  error: 'Token Expired, please login',
                });
            }
            res.status(401).json({ status: 'error', error: "Invalid token, authorization denied" });

        }
    }
}

export async function guestRouteAuth(req, res, next) {
  
    let token = req.headers.authorization;  

    // check for token
    if (!token){
         res.status(401).json({ status: 'error', error: "No token, authorization denied" });
    } else {
        try {
            token  = token.split(' ')[1];
            //verify token
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

            //check if user is an hr
            await userModel.where({id:decoded.id}).fetch()
                .then(data=>{

                    const user = data.toJSON()

                    if(user.role_id === 2) return res.status(401).json({ status: 'error', error: "Authorization denied" });

                    //Add user from payload
                    req.user = decoded;
                    next();
                })
            
        } catch (error) {
            // throw error
            if (error.name === 'TokenExpiredError') {
                return res.status(409).json({
                  status: 'error',
                  error: 'Token Expired, please login',
                });
            }
            res.status(401).json({ status: 'error', error: "Invalid token, authorization denied for route" });
        }
    }

}

export async function hrRouteAuth(req, res, next) {
  
    let token = req.headers.authorization;  

    // check for token
    if (!token){
         res.status(401).json({ status: 'error', error: "No token, authorization denied" });
    } else {
        try {
            token  = token.split(' ')[1];
            //verify token
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

            //check if user is an hr
            await userModel.where({id:decoded.id}).fetch()
                .then(data=>{

                    const user = data.toJSON()

                    if(user.role_id !== 5 && user.role_id !== 6) return res.status(401).json({ status: 'error', error: "Authorization denied" });

                    //Add user from payload
                    req.user = decoded;
                    next();
                })
            
        } catch (error) {
            // throw error
            if (error.name === 'TokenExpiredError') {
                return res.status(409).json({
                  status: 'error',
                  error: 'Token Expired, please login',
                });
            }
            res.status(401).json({ status: 'error', error: "Invalid token, authorization denied for route" });
        }
    }

}

export async function adminRouteAuth(req, res, next) {
  
    const token  = req.headers.authorization.split(' ')[1];

    // check for token
    if (!token){
         res.status(401).json({ status: 'error', error: "No token, authorization denied" });
    } else {
        try {
            //verify token
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

            //check if user is an admin
            await userModel.where({id:decoded.id}).fetch()
                .then(data=>{

                    const user = data.toJSON()

                    if(user.role_id !== 6) return res.status(401).json({ status: 'error', error: "Authorization denied" });

                    //Add user from payload
                    req.user = decoded;
                    next();
                })
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(409).json({
                  status: 'error',
                  error: 'Token Expired, please login',
                });
            }
            res.status(401).json({ status: 'error', error: "Invalid token, authorization denied for route" });
        }
    }

}