import bookshelf from '../db/bookshelf';
import Room from './roomModel';

const Reservation = bookshelf.Model.extend({
    tableName: 'reservations',
    room: function()  {
        return this.belongsTo(Room)
    }
});

export default Reservation;