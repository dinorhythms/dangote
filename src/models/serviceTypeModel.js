import bookshelf from '../db/bookshelf';

const serviceType = bookshelf.Model.extend({
    tableName: 'servicetypes'
});
  
export default serviceType;