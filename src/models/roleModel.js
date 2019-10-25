import bookshelf from '../db/bookshelf';
import User from './userModel';

const Role = bookshelf.Model.extend({
  tableName: 'roles',
  users() {
    return this.hasMany(User);
  },
});

export default Role;
