import bookshelf from '../db/bookshelf';

const StaffComplaint = bookshelf.Model.extend({
  tableName: 'staff_complaints',
});

export default StaffComplaint;
