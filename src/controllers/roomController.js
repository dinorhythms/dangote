import roomModel from '../models/roomModel';

class roomController {
  static async index(req, res) {
    // check get all
    await roomModel
      .fetchAll({
        withRelated: [
          {
            roomtype(qb) {
              qb.column('id', 'name', 'description', 'price', 'features');
            },
          },
        ],
      })
      .then((data) => {
        const rooms = data.toJSON(data);
        if (rooms) return res.status(200).json({ status: 'success', data: rooms });
      });
  }

  static async roomById(req, res) {
    const { room_id } = req.params;

    if (!room_id) {
      return res.status(400).json({ status: 'error', error: 'roomal Id is required as parameter' });
    }

    // check get by id
    await roomModel
      .where({ id: room_id })
      .fetch()
      .then((data) => {
        if (!data) {
          return res.status(400).json({ status: 'error', error: 'room with id not found' });
        }
        const room = data.toJSON(data);
        if (room) return res.status(200).json({ status: 'success', data: room });
      });
  }

  static async create(req, res) {
    const { roomtype_id, room_name, description } = req.body;

    if (!roomtype_id || !room_name || !description) {
      return res
        .status(400)
        .json({ status: 'error', error: 'All fields are required to register room' });
    }

    // create room
    const room = {
      roomtype_id,
      room_name,
      description,
      available: 1,
      condition: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Create
    await roomModel
      .forge(room)
      .save()
      .then((room) => {
        room = room.toJSON();
        // check if rootype exists
        if (room) {
          return res.status(200).json({
            status: 'success',
            data: room,
          });
        }
      });
  }

  static async update(req, res) {
    const { room_id } = req.params;

    const {
      roomtype_id, room_name, description, available, condition,
    } = req.body;

    if (!roomtype_id || !room_name || !description || !available || !condition) {
      return res
        .status(400)
        .json({ status: 'error', error: 'All fields are required to register room' });
    }

    if (!room_id) {
      return res.status(400).json({ status: 'error', error: 'room Id is required as parameter' });
    }

    const roomData = {
      roomtype_id,
      room_name,
      description,
      available,
      condition,
      updated_at: new Date(),
    };

    // Create
    await roomModel
      .where({ id: room_id })
      .fetch()
      .then((room) => {
        if (!room) {
          return res.status(400).json({ status: 'error', error: 'room with id not found' });
        }
        // room = room.toJSON()
        room.set(roomData);
        room.save().then((savedroom) => {
          savedroom = savedroom.toJSON();
          if (savedroom) {
            return res.status(200).json({
              status: 'success',
              data: savedroom,
            });
          }
        });
      });
  }

  static async delete(req, res) {
    const { room_id } = req.params;

    if (!room_id) {
      return res.status(400).json({ status: 'error', error: 'roomal Id is required as parameter' });
    }

    // check get by id
    await roomModel
      .forge({ id: room_id })
      .fetch()
      .then((room) => {
        if (!room) res.status(400).json({ status: 'error', error: 'room with id not found' });
        room
          .destroy()
          .then(() => res.status(200).json({ status: 'success', data: 'Successfully deleted room' }));
      });
  }
}

export default roomController;
