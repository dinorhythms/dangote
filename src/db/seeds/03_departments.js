exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('departments')
    .del()
    .then(() =>
    // Inserts seed entries
      knex('departments').insert([
        {
          id: 1,
          name: 'kitchen',
          description: 'food and drinks',
          duties: 'food and drinks',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'reception',
          description: 'front desk',
          duties: 'front desk',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'hr',
          description: 'human resource',
          duties: 'human resource',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'sanitation',
          description: 'cleaning and maintainance',
          duties: 'cleaning and maintainance',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: 'account',
          description: 'accountant',
          duties: 'accountant',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          name: 'admin',
          description: 'admin',
          duties: 'admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]));
};
