import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import userModel from '../models/userModel';

class authController {

    constructor(){
        dotenv.config();
    }

    static async signUp(req,res){

        const { email, first_name, last_name, password, phone, address, city, state, country, postal_code, profile_picture } = req.body;
        
        //Register
        await userModel
            .where({email})
            .fetch()
            .then(user=>{

                //check if user exists
                if(user) return res.status(400).json({status:'error', error: "User exist already, use a different email"})

                const newUser = {
                    email,
                    password,
                    first_name,
                    last_name,
                    phone,
                    address,
                    city,
                    state,
                    country,
                    postal_code,
                    role_id: 1,
                    profile_picture: (profile_picture? profile_picture: ''),
                    created_at: new Date(),
                    updated_at: new Date()
                }

                // hash password before registration
                bcrypt.genSalt(10, async (err, salt)=>{
                    await bcrypt.hash(password, salt, async (err,hash)=>{
                        if(err) throw err;
                        
                        newUser.password = hash
                        //register user
                        userModel.forge({...newUser}).save()
                            .then((savedUser) => {

                                // create Token
                                jwt.sign(
                                    { id: savedUser.id },
                                    process.env.TOKEN_SECRET,
                                    { expiresIn: 86400000 },
                                    (err, token) => {
                                        if(err) throw err;
                                        res.status(200).json({
                                            status: 'success',
                                            data: {
                                                user_id: savedUser.id,
                                                role: savedUser.role,
                                                token: token,
                                                email: savedUser.email,
                                                first_name: savedUser.first_name,
                                                last_name: savedUser.last_name,
                                                phone: savedUser.phone
                                            }
                                        })
                                    }
                                )

                            })
                        
                    })
                })

            })
    }

    static async signIn(req,res){
        const { email, password } = req.body;

        //check if user exists
        await userModel
            .where({email})
            .fetch({columns: ['id', 'email', 'password', 'first_name', 'last_name']})
            .then(data=>{
                if(!data) return res.status(400).json({status:'error', error: "User does not exist"})
                const user = data.toJSON();
                //validate the password
                bcrypt.compare(password, user.password)
                    .then((isMatch) => {

                        if(!isMatch) return res.status(400).json({status:'error', error: "Invalid Credentials"})
                        
                        jwt.sign(
                            { id: user.id },
                            process.env.TOKEN_SECRET,
                            { expiresIn: 86400000 },
                            (err, token) => {
                                if(err) throw err;
                                res.status(200).json({
                                    status: 'success',
                                    data: {
                                        user_id: user.id,
                                        is_admin: user.is_admin,
                                        token: token,
                                        email: user.email,
                                        first_name: user.first_name,
                                        last_name: user.last_name
                                    }
                                })
                            }
                        )

                    })
            })
    }

}

export default authController;