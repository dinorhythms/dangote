import bookshelf from '../db/bookshelf';
import serviceReservation from './serviceReservationModel';

const Service = bookshelf.Model.extend({
    tableName: 'services',
    servicereservations: function() {
        return this.hasMany(serviceReservation)
    }
});
  
export default Service;