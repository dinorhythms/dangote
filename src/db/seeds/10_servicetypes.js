exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('servicetypes')
    .del()
    .then(() =>
    // Inserts seed entries
      knex('servicetypes').insert([
        {
          id: 1,
          department_id: 1,
          servicetype_name: 'Food',
          description: 'Food',
          type: 'Food',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          department_id: 1,
          servicetype_name: 'Drinks',
          description: 'Drinks',
          type: 'Drinks',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          department_id: 4,
          servicetype_name: 'Mob',
          description: 'cleaning',
          type: 'Cleaning',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]));
};
