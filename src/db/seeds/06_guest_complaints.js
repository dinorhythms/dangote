exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('guest_complaints')
    .del()
    .then(() =>
    // Inserts seed entries
      knex('guest_complaints').insert([
        {
          id: 1,
          user_id: 1,
          title: 'delay of food',
          details: 'the food i ordered with delivered late',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          user_id: 2,
          title: 'delay of beer',
          details: 'the beer i ordered with delivered late',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]));
};
