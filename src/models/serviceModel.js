import bookshelf from '../db/bookshelf';

const service = bookshelf.Model.extend({
    tableName: 'services'
});
  
export default service;