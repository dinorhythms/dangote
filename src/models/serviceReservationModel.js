import bookshelf from '../db/bookshelf';
import Service from './serviceModel';

const serviceReservation = bookshelf.Model.extend({
    tableName: 'service_reservations',
    service: function()  {
        return this.belongsTo(Service)
    }
});

export default serviceReservation;