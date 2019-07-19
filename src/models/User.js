import bookshelf from '../db/bookshelf';

const User = bookshelf.Model.extend({
    tableName: 'users',
    role: ()=>{
        return this.hasOne(Role);
    },
    staff: ()=>{
        return this.hasOne(Staff);
    },
    guest: ()=>{
        return this.hasOne(Guest);
    },
    department: ()=>{
        return this.hasOne(Department);
    },
    guestComplaints: ()=>{
        return this.hasMany(GuestComplaint);
    },
    staffComplaints: ()=>{
        return this.hasMany(StaffComplaint);
    }
});
  
export default User;