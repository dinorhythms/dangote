import serviceTypeModel from '../models/serviceTypeModel';

class serviceTypeController {

    static async index(req,res){

        //check get all
        await serviceTypeModel.fetchAll()
            .then(data=>{
                const serviceTypes = data.toJSON(data)
                if(serviceTypes) return res.status(200).json({status:'success', data:serviceTypes })
            })
       
    }

    static async serviceTypeById(req,res){

        const { serviceType_id } = req.params;

        if(!serviceType_id){
            return res.status(400).json({status:'error', error: "serviceTypeal Id is required as parameter"})
        }

        //check get by id
        await serviceTypeModel.where({id: serviceType_id}).fetch()
            .then(data=>{
                if(!data) res.status(400).json({status:'error', error: "serviceType with id not found"})
                const serviceType = data.toJSON(data)
                if(serviceType) return res.status(200).json({status:'success', data:serviceType })
            })
       
    }

    static async create(req,res){

        const { department_id, servicetype_name, description, type } = req.body;

        if( !department_id || !description || !servicetype_name || !type ){
            return res.status(400).json({status:'error', error: "All fields are required to register serviceType"})
        }

        //create serviceType
        const serviceType = {
            department_id,
            servicetype_name,
            description,
            type,
            created_at: new Date(),
            updated_at: new Date()
        }
        
        //Create
        await serviceTypeModel
            .forge(serviceType)
            .save()
            .then(serviceType=>{
                serviceType = serviceType.toJSON()
                //check if rootype exists
                if(serviceType) return res.status(200).json({
                    status: 'success',
                    data: serviceType
                })
            })        
    }

    static async update(req,res){

        const { serviceType_id } = req.params;

        const { department_id, servicetype_name, description, type } = req.body;

        if( !department_id || !description || !servicetype_name || !type ){
            return res.status(400).json({status:'error', error: "All fields are required to register serviceType"})
        }

        if(!serviceType_id){
            return res.status(400).json({status:'error', error: "serviceType Id is required as parameter"})
        }

        const serviceTypeData = {
            department_id,
            servicetype_name,
            description,
            type,
            updated_at: new Date()
        }
        
        //Create
        await serviceTypeModel
            .where({id: serviceType_id})
            .fetch()
            .then(serviceType=>{
                if(!serviceType) return res.status(400).json({status:'error', error: "serviceType with id not found"})
                // serviceType = serviceType.toJSON()
                serviceType.set(serviceTypeData)
                serviceType.save().then(savedserviceType =>{
                    savedserviceType = savedserviceType.toJSON()
                    if(savedserviceType) return res.status(200).json({
                        status: 'success',
                        data: savedserviceType
                    })
                })
            })
    }

    static async delete(req,res){

        const { serviceType_id } = req.params;

        if(!serviceType_id){
            return res.status(400).json({status:'error', error: "serviceTypeal Id is required as parameter"})
        }

        //check get by id
        await serviceTypeModel.forge({id: serviceType_id}).fetch()
            .then(serviceType=>{
                if(!serviceType) res.status(400).json({status:'error', error: "serviceType with id not found"})
                serviceType.destroy()
                    .then(()=>{
                        return res.status(200).json({status:'success', data: "Successfully deleted serviceType"})
                    })
            })
       
    }

}

export default serviceTypeController;