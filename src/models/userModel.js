import bookshelf from '../db/bookshelf';
import Department from './departmentModel';
import Staff from './staffModel';
import Guest from './guestModel';
import Role from './roleModel';
import GuestComplaint from './guestComplaintModel';
import StaffComplaint from './staffComplaintModel';

const User = bookshelf.Model.extend({
  tableName: 'users',
  role: () => this.hasOne(Role),
  staff: () => this.hasOne(Staff),
  guest: () => this.hasOne(Guest),
  department: () => this.hasOne(Department),
  guestComplaints: () => this.hasMany(GuestComplaint),
  staffComplaints: () => this.hasMany(StaffComplaint),
});

export default User;
