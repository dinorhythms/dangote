import reservationModel from '../models/reservationModel';

class reservationController {

    static async index(req, res) {

        const userId = req.user.id;

        //check get all
        await reservationModel.where({ user_id: userId }).fetchAll()
            .then(data => {
                const reservations = data.toJSON(data)
                if (reservations) return res.status(200).json({ status: 'success', data: reservations })
            })

    }

    static async byId(req, res) {

        const { reservation_id } = req.params;
        const userId = req.user.id;

        if (!reservation_id) {
            return res.status(400).json({ status: 'error', error: "reservation Id is required as parameter" })
        }

        //check get by id
        await reservationModel.where({ user_id: userId, id: reservation_id }).fetch()
            .then(data => {
                if (!data) return res.status(400).json({ status: 'error', error: "reservation with id not found" })
                const reservation = data.toJSON(data)
                if (reservation) return res.status(200).json({ status: 'success', data: reservation })
            })

    }

    static async create(req, res) {

        const { room_id, start_date, end_date, comment } = req.body;
        const user_id = req.user.id;

        if (!room_id || !start_date || !end_date || !comment) {
            return res.status(400).json({ status: 'error', error: "All fields are required to register reservation" })
        }

        //create reservation
        const reservation = {
            room_id,
            user_id,
            booked_date: new Date(),
            start_date,
            end_date,
            comment,
            created_at: new Date(),
            updated_at: new Date()
        }

        //Create
        await reservationModel
            .forge(reservation)
            .save()
            .then(reservation => {
                reservation = reservation.toJSON()
                //check if rootype exists
                if (reservation) return res.status(200).json({
                    status: 'success',
                    data: reservation
                })
            })
    }

    static async update(req, res) {

        const { reservation_id } = req.params;

        const { room_id, start_date, end_date, comment } = req.body;

        if (!room_id || !user_id || !start_date || !end_date || !comment) {
            return res.status(400).json({ status: 'error', error: "All fields are required to register reservation" })
        }

        if (!reservation_id) {
            return res.status(400).json({ status: 'error', error: "reservation Id is required as parameter" })
        }

        const reservationData = {
            room_id,
            start_date,
            end_date,
            comment,
            updated_at: new Date()
        }

        //Create
        await reservationModel
            .where({ id: reservation_id })
            .fetch()
            .then(reservation => {
                if (!reservation) return res.status(400).json({ status: 'error', error: "reservation with id not found" })
                // reservation = reservation.toJSON()
                reservation.set(reservationData)
                reservation.save().then(savedreservation => {
                    savedreservation = savedreservation.toJSON()
                    if (savedreservation) return res.status(200).json({
                        status: 'success',
                        data: savedreservation
                    })
                })
            })
    }

    static async delete(req, res) {

        const { reservation_id } = req.params;

        if (!reservation_id) {
            return res.status(400).json({ status: 'error', error: "reservational Id is required as parameter" })
        }

        //check get by id
        await reservationModel.forge({ id: reservation_id }).fetch()
            .then(reservation => {
                if (!reservation) res.status(400).json({ status: 'error', error: "reservation with id not found" })
                reservation.destroy()
                    .then(() => {
                        return res.status(200).json({ status: 'success', data: "Successfully deleted reservation" })
                    })
            })

    }

    /////////HR OR MANAGEMENT

    static async hrAll(req, res) {

        //check get all
        await reservationModel.fetchAll()
            .then(data => {
                const reservations = data.toJSON(data)
                if (reservations) return res.status(200).json({ status: 'success', data: reservations })
            })

    }

    static async hrById(req, res) {

        const { reservation_id } = req.params;

        if (!reservation_id) {
            return res.status(400).json({ status: 'error', error: "reservation Id is required as parameter" })
        }

        //check get by id
        await reservationModel.where({ id: reservation_id }).fetch()
            .then(data => {
                if (!data) return res.status(400).json({ status: 'error', error: "reservation with id not found" })
                const reservation = data.toJSON(data)
                if (reservation) return res.status(200).json({ status: 'success', data: reservation })
            })

    }

    static async update(req, res) {

        const { reservation_id } = req.params;
        const hr_user_id = req.user.id;

        const { user_id, hr_user_id, receptionist_user_id, approved, cancelled } = req.body;

        if (!room_id || !user_id || !start_date || !end_date || !comment) {
            return res.status(400).json({ status: 'error', error: "All fields are required to register reservation" })
        }

        if (!reservation_id) {
            return res.status(400).json({ status: 'error', error: "reservation Id is required as parameter" })
        }

        const reservationData = {
            hr_user_id: hr_user_id || null,
            receptionist_user_id: receptionist_user_id,
            processed: 1,
            approved: approved || 0,
            paid: paid || 0,
            cancelled: cancelled || 0,
            updated_at: new Date()
        }

        //Create
        await reservationModel
            .where({ id: reservation_id })
            .fetch()
            .then(reservation => {
                if (!reservation) return res.status(400).json({ status: 'error', error: "reservation with id not found" })
                // reservation = reservation.toJSON()
                reservation.set(reservationData)
                reservation.save().then(savedreservation => {
                    savedreservation = savedreservation.toJSON()
                    if (savedreservation) return res.status(200).json({
                        status: 'success',
                        data: savedreservation
                    })
                })
            })
    }

}

export default reservationController;