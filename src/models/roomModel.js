import bookshelf from '../db/bookshelf';
import Reservation from './reservationModel';
import RoomType from './roomTypeModel';

const Room = bookshelf.Model.extend({
  tableName: 'rooms',
  reservations() {
    return this.hasMany(Reservation);
  },
  roomtype() {
    return this.belongsTo(RoomType);
  },
});

export default Room;
