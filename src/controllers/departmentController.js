import departmentModel from '../models/departmentModel';

class departmentController {

    static async index(req,res){

        //check get all
        await departmentModel.fetchAll()
            .then(data=>{
                const departments = data.toJSON(data)
                if(departments) return res.status(200).json({status:'success', data:departments })
            })
       
    }

    static async deptById(req,res){

        const { department_id } = req.params;

        if(!department_id){
            return res.status(400).json({status:'error', error: "departmental Id is required as parameter"})
        }

        //check get by id
        await departmentModel.where({id: department_id}).fetch()
            .then(data=>{
                if(!data) res.status(400).json({status:'error', error: "department with id not found"})
                const department = data.toJSON(data)
                if(departments) return res.status(200).json({status:'success', data:department })
            })
       
    }

    static async create(req,res){

        const { name, description, duties } = req.body;

        if(!name || !description || !duties ){
            return res.status(400).json({status:'error', error: "All fields are required"})
        }

        const department = {
            name,
            description,
            duties,
            created_at: new Date(),
            updated_at: new Date()
        }
        
        //Create
        await departmentModel
            .forge(department)
            .save()
            .then(department=>{
                department = department.toJSON()
                //check if user exists
                if(department) return res.status(200).json({
                    status: 'success',
                    data: department
                })

                
            })
    }

    static async update(req,res){
        const { name, description, duties } = req.body;
        const { department_id } = req.params;

        if(!name || !description || !duties ){
            return res.status(400).json({status:'error', error: "All fields are required"})
        }

        if(!department_id){
            return res.status(400).json({status:'error', error: "departmental Id is required as parameter"})
        }

        const departmentData = {
            name,
            description,
            duties,
            updated_at: new Date()
        }
        
        //Create
        await departmentModel
            .where({id: department_id})
            .fetch()
            .then(department=>{
                if(!department) res.status(400).json({status:'error', error: "department with id not found"})
                department.set(departmentData)
                department.save().then(dept =>{
                    dept = dept.toJSON()
                    if(dept) return res.status(200).json({
                        status: 'success',
                        data: dept
                    })
                })
            })
    }

    static async delete(req,res){

        const { department_id } = req.params;

        if(!department_id){
            return res.status(400).json({status:'error', error: "departmental Id is required as parameter"})
        }

        //check get by id
        await departmentModel.forge({id: department_id}).fetch()
            .then(department=>{
                if(!department) res.status(400).json({status:'error', error: "department with id not found"})
                department.destroy()
                    .then(()=>{
                        return res.status(200).json({status:'success', data: "Successfully deleted Department"})
                    })
            })
       
    }

}

export default departmentController;