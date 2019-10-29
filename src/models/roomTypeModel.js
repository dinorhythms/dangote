import bookshelf from '../db/bookshelf';
import Room from './roomModel';

const RoomType = bookshelf.Model.extend({
  tableName: 'roomtypes',
  room() {
    return this.hasMany(Room);
  },
});

export default RoomType;
