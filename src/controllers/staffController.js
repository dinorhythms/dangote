import staffModel from '../models/staffModel';
import userModel from '../models/userModel';
import bcrypt from 'bcryptjs';

class staffController {

    static async index(req,res){

        //check get all
        await staffModel.fetchAll()
            .then(data=>{
                const staffs = data.toJSON(data)
                if(staffs) return res.status(200).json({status:'success', data:staffs })
            })
       
    }

    static async staffById(req,res){

        const { staff_id } = req.params;

        if(!staff_id){
            return res.status(400).json({status:'error', error: "staffal Id is required as parameter"})
        }

        //check get by id
        await staffModel.where({id: staff_id}).fetch()
            .then(data=>{
                if(!data) res.status(400).json({status:'error', error: "staff with id not found"})
                const staff = data.toJSON(data)
                if(staff) return res.status(200).json({status:'success', data:staff })
            })
       
    }

    static async create(req,res){

        const { department_id, staff_number, position, joined, role_id } = req.body;
        const { email, first_name, last_name, password, phone, address, city, state, country, postal_code, profile_picture } = req.body;

        if( !department_id || !staff_number || !position || !joined || !role_id ){
            return res.status(400).json({status:'error', error: "All fields are required to register staff"})
        }

        //Register user
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
                    role_id: role_id,
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
                            .then( async savedUser => {
                                savedUser = savedUser.toJSON();
                                
                                //create staff
                                const staff = {
                                    user_id: savedUser.id,
                                    department_id,
                                    staff_number,
                                    position,
                                    joined,
                                    created_at: new Date(),
                                    updated_at: new Date()
                                }
                                
                                //Create
                                await staffModel
                                    .forge(staff)
                                    .save()
                                    .then(staff=>{
                                        staff = staff.toJSON()
                                        //check if user exists
                                        if(staff) return res.status(200).json({
                                            status: 'success',
                                            data: staff
                                        })
                                    })

                            })
                        
                    })
                })

            })
        
    }

    static async update(req,res){
        const { department_id, staff_number, position, joined } = req.body;
        const { staff_id } = req.params;

        if( !department_id || !staff_number || !position || !joined ){
            return res.status(400).json({status:'error', error: "All fields are required to register staff"})
        }

        if(!staff_id){
            return res.status(400).json({status:'error', error: "staff Id is required as parameter"})
        }

        const staffData = {
            department_id,
            staff_number,
            position,
            joined,
            updated_at: new Date()
        }
        
        //Create
        await staffModel
            .where({id: staff_id})
            .fetch()
            .then(staff=>{
                if(!staff) res.status(400).json({status:'error', error: "staff with id not found"})
                // staff = staff.toJSON()
                staff.set(staffData)
                staff.save().then(savedStaff =>{
                    savedStaff = savedStaff.toJSON()
                    if(savedStaff) return res.status(200).json({
                        status: 'success',
                        data: savedStaff
                    })
                })
            })
    }

    static async delete(req,res){

        const { staff_id } = req.params;

        if(!staff_id){
            return res.status(400).json({status:'error', error: "staffal Id is required as parameter"})
        }

        //check get by id
        await staffModel.forge({id: staff_id}).fetch()
            .then(staff=>{
                if(!staff) res.status(400).json({status:'error', error: "staff with id not found"})
                staff.destroy()
                    .then(()=>{
                        return res.status(200).json({status:'success', data: "Successfully deleted staff"})
                    })
            })
       
    }

}

export default staffController;