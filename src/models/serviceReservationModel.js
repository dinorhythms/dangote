import bookshelf from '../db/bookshelf';

const serviceReservation = bookshelf.Model.extend({
    tableName: 'service_reservations'
});

export default serviceReservation;