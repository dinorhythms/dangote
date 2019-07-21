import bookshelf from '../db/bookshelf';

const Department = bookshelf.Model.extend({
    tableName: 'departments'
});
  
export default Department;