import bookshelf from '../db/bookshelf';

const roomType = bookshelf.Model.extend({
    tableName: 'roomtypes'
});
  
export default roomType;