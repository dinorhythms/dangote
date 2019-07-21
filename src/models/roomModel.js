import bookshelf from '../db/bookshelf';

const Room = bookshelf.Model.extend({
    tableName: 'rooms'
});
  
export default Room;