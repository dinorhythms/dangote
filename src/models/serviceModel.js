import bookshelf from '../db/bookshelf';

const Service = bookshelf.Model.extend({
    tableName: 'services'
});
  
export default Service;