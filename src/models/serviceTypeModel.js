import bookshelf from '../db/bookshelf';

const ServiceType = bookshelf.Model.extend({
    tableName: 'servicetypes'
});
  
export default ServiceType;