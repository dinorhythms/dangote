import bookshelf from '../db/bookshelf';

const RoomType = bookshelf.Model.extend({
    tableName: 'roomtypes'
});
  
export default RoomType;