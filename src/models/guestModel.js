import bookshelf from '../db/bookshelf';

const Guest = bookshelf.Model.extend({
    tableName: 'guests'
});
  
export default Guest;