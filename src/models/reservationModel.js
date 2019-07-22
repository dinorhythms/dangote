import bookshelf from '../db/bookshelf';

const Reservation = bookshelf.Model.extend({
    tableName: 'reservations'
});

export default Reservation;