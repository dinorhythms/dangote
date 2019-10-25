import bookshelf from '../db/bookshelf';

const GuestComplaint = bookshelf.Model.extend({
  tableName: 'guest_complaints',
});

export default GuestComplaint;
