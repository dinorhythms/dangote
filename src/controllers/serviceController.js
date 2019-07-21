import serviceModel from '../models/serviceModel';

class serviceController {

    static async index(req,res){

        //check get all
        await serviceModel.fetchAll()
            .then(data=>{
                const services = data.toJSON(data)
                if(services) return res.status(200).json({status:'success', data:services })
            })
       
    }

    static async serviceById(req,res){

        const { service_id } = req.params;

        if(!service_id){
            return res.status(400).json({status:'error', error: "serviceal Id is required as parameter"})
        }

        //check get by id
        await serviceModel.where({id: service_id}).fetch()
            .then(data=>{
                if(!data) res.status(400).json({status:'error', error: "service with id not found"})
                const service = data.toJSON(data)
                if(service) return res.status(200).json({status:'success', data:service })
            })
       
    }

    static async create(req,res){

        const { servicetype_id, service_name, description, price, available } = req.body;

        if( !servicetype_id || !description || !service_name || !price || !available ){
            return res.status(400).json({status:'error', error: "All fields are required to register service"})
        }

        //create service
        const service = {
            servicetype_id,
            service_name,
            description,
            price,
            available,
            created_at: new Date(),
            updated_at: new Date()
        }
        
        //Create
        await serviceModel
            .forge(service)
            .save()
            .then(service=>{
                service = service.toJSON()
                //check if rootype exists
                if(service) return res.status(200).json({
                    status: 'success',
                    data: service
                })
            })        
    }

    static async update(req,res){

        const { service_id } = req.params;

        const { servicetype_id, service_name, description, price, available } = req.body;

        if( !servicetype_id || !description || !service_name || !price || !available ){
            return res.status(400).json({status:'error', error: "All fields are required to register service"})
        }


        if(!service_id){
            return res.status(400).json({status:'error', error: "service Id is required as parameter"})
        }

        const serviceData = {
            servicetype_id,
            service_name,
            description,
            price,
            available,
            updated_at: new Date()
        }
        
        //Create
        await serviceModel
            .where({id: service_id})
            .fetch()
            .then(service=>{
                if(!service) return res.status(400).json({status:'error', error: "service with id not found"})
                // service = service.toJSON()
                service.set(serviceData)
                service.save().then(savedservice =>{
                    savedservice = savedservice.toJSON()
                    if(savedservice) return res.status(200).json({
                        status: 'success',
                        data: savedservice
                    })
                })
            })
    }

    static async delete(req,res){

        const { service_id } = req.params;

        if(!service_id){
            return res.status(400).json({status:'error', error: "serviceal Id is required as parameter"})
        }

        //check get by id
        await serviceModel.forge({id: service_id}).fetch()
            .then(service=>{
                if(!service) res.status(400).json({status:'error', error: "service with id not found"})
                service.destroy()
                    .then(()=>{
                        return res.status(200).json({status:'success', data: "Successfully deleted service"})
                    })
            })
       
    }

}

export default serviceController;