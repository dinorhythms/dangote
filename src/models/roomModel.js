import bookshelf from '../db/bookshelf';
import Reservation from './reservationModel';

const Room = bookshelf.Model.extend({
    tableName: 'rooms',
    reservations: function() {
        return this.hasMany(Reservation)
    }
});
  
export default Room;