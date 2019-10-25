exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles')
    .del()
    .then(() =>
    // Inserts seed entries
			 knex('roles').insert([
        {
          id: 1,
          name: 'guest',
          description: 'role for customer',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'service',
          description: 'role for staff that render services	',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'receptionist',
          description: 'role for staff that are receptionists',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'accountant',
          description: 'role for staff that are accountants',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: 'hr',
          description: 'role for staff that are human resource',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          name: 'admin',
          description: 'role for staff that are admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]));
};
