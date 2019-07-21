import bookshelf from '../db/bookshelf';

const room = bookshelf.Model.extend({
    tableName: 'rooms'
});
  
export default room;