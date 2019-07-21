import roomTypeModel from '../models/roomTypeModel';

class roomTypeController {

    static async index(req,res){

        //check get all
        await roomTypeModel.fetchAll()
            .then(data=>{
                const roomTypes = data.toJSON(data)
                if(roomTypes) return res.status(200).json({status:'success', data:roomTypes })
            })
       
    }

    static async roomTypeById(req,res){

        const { roomType_id } = req.params;

        if(!roomType_id){
            return res.status(400).json({status:'error', error: "roomTypeal Id is required as parameter"})
        }

        //check get by id
        await roomTypeModel.where({id: roomType_id}).fetch()
            .then(data=>{
                if(!data) res.status(400).json({status:'error', error: "roomType with id not found"})
                const roomType = data.toJSON(data)
                if(roomType) return res.status(200).json({status:'success', data:roomType })
            })
       
    }

    static async create(req,res){

        const { name, description, price, features } = req.body;

        if( !name || !description || !price || !features ){
            return res.status(400).json({status:'error', error: "All fields are required to register roomType"})
        }

        //create roomType
        const roomType = {
            name,
            description,
            price,
            features,
            created_at: new Date(),
            updated_at: new Date()
        }
        
        //Create
        await roomTypeModel
            .forge(roomType)
            .save()
            .then(roomType=>{
                roomType = roomType.toJSON()
                //check if rootype exists
                if(roomType) return res.status(200).json({
                    status: 'success',
                    data: roomType
                })
            })        
    }

    static async update(req,res){

        const { roomType_id } = req.params;

        const { name, description, price, features } = req.body;

        if( !name || !description || !price || !features ){
            return res.status(400).json({status:'error', error: "All fields are required to register roomType"})
        }

        if(!roomType_id){
            return res.status(400).json({status:'error', error: "roomType Id is required as parameter"})
        }

        const roomTypeData = {
            name,
            description,
            price,
            features,
            updated_at: new Date()
        }
        
        //Create
        await roomTypeModel
            .where({id: roomType_id})
            .fetch()
            .then(roomType=>{
                if(!roomType) return res.status(400).json({status:'error', error: "roomType with id not found"})
                // roomType = roomType.toJSON()
                roomType.set(roomTypeData)
                roomType.save().then(savedroomType =>{
                    savedroomType = savedroomType.toJSON()
                    if(savedroomType) return res.status(200).json({
                        status: 'success',
                        data: savedroomType
                    })
                })
            })
    }

    static async delete(req,res){

        const { roomType_id } = req.params;

        if(!roomType_id){
            return res.status(400).json({status:'error', error: "roomTypeal Id is required as parameter"})
        }

        //check get by id
        await roomTypeModel.forge({id: roomType_id}).fetch()
            .then(roomType=>{
                if(!roomType) res.status(400).json({status:'error', error: "roomType with id not found"})
                roomType.destroy()
                    .then(()=>{
                        return res.status(200).json({status:'success', data: "Successfully deleted roomType"})
                    })
            })
       
    }

}

export default roomTypeController;