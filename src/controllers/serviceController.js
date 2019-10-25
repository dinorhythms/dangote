import serviceModel from '../models/serviceModel';
import serviceReservationModel from '../models/serviceReservationModel';

class serviceController {

    /**
     * @ HR CREATES SERVICES AND TYPES
     * @param {*} req 
     * @param {*} res 
     */
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

    //GUEST BOOKING

    static async guestAll(req,res){
        const guest_id  =  req.user.id
        //check get all
        const data = await serviceReservationModel.where({guest_id}).fetchAll({ withRelated: ['service'] })
        if(data){
            const services = data.toJSON(data)
            if(services) return res.status(200).json({status:'success', data:services })
        }else{
            return res.status(400).json({status:'error', error: "service not found"})
        }
       
    }

    static async guestById(req,res){

        const { service_id } = req.params;
        const guest_id  =  req.user.id

        if(!service_id){
            return res.status(400).json({status:'error', error: "service Id is required as parameter"})
        }

        //check get by id
        const data = await serviceReservationModel.where({id: service_id, guest_id}).fetch({ withRelated: ['service'] })
        if(!data) return res.status(400).json({status:'error', error: "service with id could not be found"})
        const service = data.toJSON(data)
        if(service) return res.status(200).json({status:'success', data:service })
    }

    static async guestBooking(req,res){

        try {
            const guest_id  =  req.user.id

            const { service_id, booked_date } = req.body;

            if( !service_id || !booked_date ){
                return res.status(400).json({status:'error', error: "All fields service_id and booked_date are required to register service"})
            }

            //create service
            const serviceData = {
                service_id,
                guest_id,
                booked_date,
                created_at: new Date(),
                updated_at: new Date()
            }
            
            //Create
            const data = await serviceReservationModel.forge(serviceData).save()
                
            const service = data.toJSON()
            //check if rootype exists
            if(service) return res.status(200).json({
                status: 'success',
                data: service
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async guestUpdate(req,res){

        try {
            const guest_id  =  req.user.id
            const { service_reservation_id } = req.params;
            const { service_id, booked_date } = req.body;

            if( !service_reservation_id ){
                return res.status(400).json({status:'error', error: "All fields service id  are required to register service"})
            }

            //create service
            const serviceData = {
                service_id: parseInt(service_id),
                guest_id: parseInt(guest_id),
                booked_date,
                updated_at: new Date()
            }
            
            //Create
            let service = await serviceReservationModel.where({ id: service_reservation_id, guest_id }).fetch();
            if(!service) return res.status(400).json({status:'error', error: "service with id not found"})
            // service = service.toJSON()
            service.set(serviceData)
            let savedservice = await service.save();
            savedservice = savedservice.toJSON()
            if(savedservice) return res.status(200).json({
                    status: 'success',
                    data: savedservice
                })

        } catch (error) {
            console.log(error)
        }
    }

    /**
     * RECEPTIONIST PROCESSING
    */
    
    static async recepAll(req,res){
        //check get all
        const data = await serviceReservationModel.fetchAll();
        if(data){
            const services = data.toJSON(data)
            if(services) return res.status(200).json({status:'success', data:services })
        }else{
            return res.status(400).json({status:'error', error: "service not found"})
        }
       
    }

    static async recepById(req,res){

        const { service_reservation_id } = req.params;

        if(!service_reservation_id){
            return res.status(400).json({status:'error', error: "service Id is required as parameter"})
        }

        //check get by id
        const data = await serviceReservationModel.where({id: service_reservation_id}).fetch()
        if(!data) return res.status(400).json({status:'error', error: "service with id could not be found"})
        const service = data.toJSON(data)
        if(service) return res.status(200).json({status:'success', data:service })
    }

    static async recepUpdate(req,res){

        try {
            const receptionist_user_id = req.user.id;
            const { service_reservation_id } = req.params;
            let { service_staff_id, approved, cancelled } = req.body;

            if( !service_reservation_id || !service_staff_id ){
                return res.status(400).json({status:'error', error: "All fields service id  are required to register service"})
            }

            approved = parseInt(approved);
            cancelled = parseInt(cancelled);

            //create service object
            const serviceData = {
                receptionist_user_id: receptionist_user_id,
                service_staff_id: parseInt(service_staff_id),
                processed: 1,
                approved: approved || 0,
                cancelled: cancelled || 0,
                updated_at: new Date()
            }
            
            //Find and update
            let service = await serviceReservationModel.where({ id: service_reservation_id }).fetch();
            if(!service) return res.status(400).json({status:'error', error: "service with id not found"})
            // service = service.toJSON()
            service.set(serviceData)
            let savedservice = await service.save();
            savedservice = savedservice.toJSON()
            if(savedservice) return res.status(200).json({
                    status: 'success',
                    data: savedservice
                })

        } catch (error) {
            console.log(error)
        }
    }

    /**
     * SERVICES PROCESSING
    */
    
    static async serviceStaffAll(req,res){
        try {
            const user_id = req.user.id;
            //check get all
            const data = await serviceReservationModel.where({service_staff_id: user_id}).fetchAll();
            if(data){
                const services = data.toJSON(data)
                if(services) return res.status(200).json({status:'success', data:services })
            }else{
                return res.status(400).json({status:'error', error: "service not found"})
            }
        } catch (error) {
            console.log(error)
        }
       
    }

    static async serviceStaffById(req,res){

        const user_id = req.user.id;
        const { service_reservation_id } = req.params;

        if(!service_reservation_id){
            return res.status(400).json({status:'error', error: "service Id is required as parameter"})
        }

        //check get by id
        const data = await serviceReservationModel.where({id: service_reservation_id, service_staff_id: user_id}).fetch()
        if(!data) return res.status(400).json({status:'error', error: "service with id could not be found"})
        const service = data.toJSON(data)
        if(service) return res.status(200).json({status:'success', data:service })
    }

    static async serviceStaffUpdate(req,res){

        try {
            const service_staff_id = req.user.id;
            const { service_reservation_id } = req.params;
            let { comment } = req.body;

            if( !service_reservation_id || !comment ){
                return res.status(400).json({status:'error', error: "All fields service id  are required to register service"})
            }

            //create service object
            const serviceData = {
                comment,
                updated_at: new Date()
            }
            
            //Find and update
            let service = await serviceReservationModel.where({ id: service_reservation_id, service_staff_id: service_staff_id }).fetch();
            if(!service) return res.status(400).json({status:'error', error: "service with id not found"})
            // service = service.toJSON()
            service.set(serviceData)
            let savedservice = await service.save();
            savedservice = savedservice.toJSON()
            if(savedservice) return res.status(200).json({
                    status: 'success',
                    data: savedservice
                })

        } catch (error) {
            console.log(error)
        }
    }

    

}

export default serviceController;