import bookshelf from '../db/bookshelf';

const Staff = bookshelf.Model.extend({
    tableName: 'staffs'
});
  
export default Staff;