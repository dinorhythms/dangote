exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('staff_complaints')
    .del()
    .then(() =>
    // Inserts seed entries
      knex('staff_complaints').insert([
        {
          id: 1,
          user_id: 3,
          title: 'delay of salary',
          details: 'last month salary was delayed',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          user_id: 4,
          title: 'delay of salary',
          details: 'last month salary was delayed',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]));
};
