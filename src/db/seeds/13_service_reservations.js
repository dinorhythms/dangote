
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('service_reservations').del()
    .then(function () {
      // Inserts seed entries
      return knex('service_reservations').insert([
        {
          id: 1,
          service_id: 1,
          guest_id: 1,
          receptionist_user_id: 4,
          service_staff_id: 3,
          booked_date: '2019-07-21T18:24:32.903Z',
          paid: 1,
          processed: 1,
          approved: 1,
          cancelled: 0,
          comment: 'good',
          price: '500',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          service_id: 2,
          guest_id: 1,
          receptionist_user_id: 4,
          service_staff_id: 3,
          booked_date: '2019-07-21T18:24:32.903Z',
          paid: 1,
          processed: 1,
          approved: 1,
          cancelled: 0,
          comment: 'good meal',
          price: '1500',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          service_id: 3,
          guest_id: 1,
          receptionist_user_id: 4,
          service_staff_id: 3,
          booked_date: '2019-07-21T18:24:32.903Z',
          paid: 1,
          processed: 1,
          approved: 1,
          cancelled: 0,
          comment: 'good meal',
          price: '500',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    });
};
