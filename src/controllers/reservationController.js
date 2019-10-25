import reservationModel from '../models/reservationModel';

class reservationController {

  static async index(req, res) {

    const userId = req.user.id;

    // check get all
    await reservationModel.where({ user_id: userId }).fetchAll({ withRelated: ['room'] })
      .then((data) => {
        const reservations = data.toJSON(data);
        if (reservations) return res.status(200).json({ status: 'success', data: reservations });
      });

  }

  static async byId(req, res) {

    const { reservation_id } = req.params;
    const userId = req.user.id;

    if (!reservation_id) {
      return res.status(400).json({ status: 'error', error: 'reservation Id is required as parameter' });
    }

    // check get by id
    await reservationModel.where({ user_id: userId, id: reservation_id }).fetch({ withRelated: ['room'] })
      .then((data) => {
        if (!data) return res.status(400).json({ status: 'error', error: 'reservation with id not found' });
        const reservation = data.toJSON(data);
        if (reservation) return res.status(200).json({ status: 'success', data: reservation });
      });

  }

  static async create(req, res) {

    const {
 room_id, start_date, end_date, comment 
} = req.body;
    const user_id = req.user.id;

    if (!room_id || !start_date || !end_date || !comment) {
      return res.status(400).json({ status: 'error', error: 'All fields are required to register reservation' });
    }

    // create reservation
    const reservation = {
      room_id,
      user_id,
      booked_date: new Date(),
      start_date,
      end_date,
      comment,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Create
    await reservationModel
      .forge(reservation)
      .save()
      .then((reservation) => {
        reservation = reservation.toJSON();
        // check if rootype exists
        if (reservation) {return res.status(200).json({
                    status: 'success',
                    data: reservation
                })};
      });
  }

  static async update(req, res) {

    const { reservation_id } = req.params;

    const {
 room_id, start_date, end_date, comment 
} = req.body;

    if (!room_id || !user_id || !start_date || !end_date || !comment) {
      return res.status(400).json({ status: 'error', error: 'All fields are required to register reservation' });
    }

    if (!reservation_id) {
      return res.status(400).json({ status: 'error', error: 'reservation Id is required as parameter' });
    }

    const reservationData = {
      room_id,
      start_date,
      end_date,
      comment,
      updated_at: new Date(),
    };

    // Create
    await reservationModel
      .where({ id: reservation_id })
      .fetch()
      .then((reservation) => {
        if (!reservation) return res.status(400).json({ status: 'error', error: 'reservation with id not found' });
        // reservation = reservation.toJSON()
        reservation.set(reservationData);
        reservation.save().then((savedreservation) => {
          savedreservation = savedreservation.toJSON();
          if (savedreservation) {return res.status(200).json({
                        status: 'success',
                        data: savedreservation
                    })};
        });
      });
  }

  static async delete(req, res) {

    const { reservation_id } = req.params;

    if (!reservation_id) {
      return res.status(400).json({ status: 'error', error: 'reservational Id is required as parameter' });
    }

    // check get by id
    await reservationModel.forge({ id: reservation_id }).fetch()
      .then((reservation) => {
        if (!reservation) res.status(400).json({ status: 'error', error: 'reservation with id not found' });
        reservation.destroy()
          .then(() => res.status(200).json({ status: 'success', data: "Successfully deleted reservation" }));
      });

  }

  // ///////HR OR MANAGEMENT

  static async hrAll(req, res) {

    // check get all
    await reservationModel.fetchAll()
      .then((data) => {
        const reservations = data.toJSON(data);
        if (reservations) return res.status(200).json({ status: 'success', data: reservations });
      });

  }

  static async hrById(req, res) {

    const { reservation_id } = req.params;

    if (!reservation_id) {
      return res.status(400).json({ status: 'error', error: 'reservation Id is required as parameter' });
    }

    // check get by id
    await reservationModel.where({ id: reservation_id }).fetch()
      .then((data) => {
        if (!data) return res.status(400).json({ status: 'error', error: 'reservation with id not found' });
        const reservation = data.toJSON(data);
        if (reservation) return res.status(200).json({ status: 'success', data: reservation });
      });

  }

  static async process(req, res) {

    const { reservation_id } = req.params;
    const hr_user_id = req.user.id;

    let { receptionist_user_id, approved, cancelled } = req.body;

    if (!reservation_id || !receptionist_user_id) {
      return res.status(400).json({ status: 'error', error: 'reservation ID and receptionist ID is required as parameter' });
    }

    approved = parseInt(approved);
    cancelled = parseInt(cancelled);

    const reservationData = {
      hr_user_id,
      receptionist_user_id,
      processed: 1,
      approved: approved || 0,
      cancelled: cancelled || 0,
      updated_at: new Date(),
    };

    // Create
    await reservationModel
      .where({ id: reservation_id })
      .fetch()
      .then((reservation) => {
        if (!reservation) return res.status(400).json({ status: 'error', error: 'reservation with id not found' });
        // reservation = reservation.toJSON()
        reservation.set(reservationData);
        reservation.save().then((savedreservation) => {
          savedreservation = savedreservation.toJSON();
          if (savedreservation) {return res.status(200).json({
                        status: 'success',
                        data: savedreservation
                    })};
        });
      });
  }

  // ///////// RECEPTIONIST MANAGEMENT

  static async recepAll(req, res) {

    const receptionist_user_id = req.user.id;

    // check get all
    await reservationModel.where({
 receptionist_user_id, processed: 1, approved: 1, cancelled: 0 
}).fetchAll()
      .then((data) => {
        const reservations = data.toJSON(data);
        if (reservations) return res.status(200).json({ status: 'success', data: reservations });
      });

  }

  static async recepById(req, res) {

    const { reservation_id } = req.params;
    const receptionist_user_id = req.user.id;

    if (!reservation_id) {
      return res.status(400).json({ status: 'error', error: 'reservation Id is required as parameter' });
    }

    // check get by id
    await reservationModel.where({
 id: reservation_id, receptionist_user_id, processed: 1, approved: 1, cancelled: 0 
}).fetch()
      .then((data) => {
        if (!data) return res.status(400).json({ status: 'error', error: 'reservation with id not found' });
        const reservation = data.toJSON(data);
        if (reservation) return res.status(200).json({ status: 'success', data: reservation });
      });
  }

  static async recepProcess(req, res) {

    const { reservation_id } = req.params;
    const receptionist_user_id = req.user.id;

    const { checkedin_date } = req.body;

    if (!reservation_id || !checkedin_date) {
      return res.status(400).json({ status: 'error', error: 'reservation ID and receptionist ID is required as parameter' });
    }

    const reservationData = {
      checkedin_date,
      updated_at: new Date(),
    };

    // Update
    await reservationModel
      .where({
 id: reservation_id, receptionist_user_id, processed: 1, approved: 1, cancelled: 0 
})
      .fetch()
      .then((reservation) => {
        if (!reservation) return res.status(400).json({ status: 'error', error: 'reservation with id not found' });
        // reservation = reservation.toJSON()
        reservation.set(reservationData);
        reservation.save().then((savedreservation) => {
          savedreservation = savedreservation.toJSON();
          if (savedreservation) {return res.status(200).json({
                        status: 'success',
                        data: savedreservation
                    })};
        });
      });
  }

  static async recepCheckout(req, res) {

    const { reservation_id } = req.params;
    const receptionist_user_id = req.user.id;

    const { checkout_date } = req.body;

    if (!reservation_id || !checkout_date) {
      return res.status(400).json({ status: 'error', error: 'reservation ID and receptionist ID is required as parameter' });
    }

    const reservationData = {
      checkout_date,
      updated_at: new Date(),
    };

    // Create
    await reservationModel
      .where({
 id: reservation_id, receptionist_user_id, processed: 1, approved: 1, cancelled: 0 
})
      .fetch()
      .then((reservation) => {
        if (!reservation) return res.status(400).json({ status: 'error', error: 'reservation with id not found' });
        // reservation = reservation.toJSON()
        reservation.set(reservationData);
        reservation.save().then((savedreservation) => {
          savedreservation = savedreservation.toJSON();
          if (savedreservation) {return res.status(200).json({
                        status: 'success',
                        data: savedreservation
                    })};
        });
      });
  }

}

export default reservationController;
