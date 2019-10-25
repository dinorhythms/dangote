exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('staffs')
    .del()
    .then(() =>
    // Inserts seed entries
      knex('staffs').insert([
        { 
          id: 1, 
          user_id: 3,
          department_id: 1,
          staff_number: '001',
          position: 'HOD',
          joined: '2019-07-21T17:24:32.000Z',
          created_at: new Date(),
          updated_at: new Date(),
        },
        { 
          id: 2, 
          user_id: 4,
          department_id: 2,
          staff_number: '002',
          position: 'HOD',
          joined: '2019-07-21T17:24:32.000Z',
          created_at: new Date(),
          updated_at: new Date(),
        },
        { 
          id: 3, 
          user_id: 5,
          department_id: 5,
          staff_number: '003',
          position: 'HOD',
          joined: '2019-07-21T17:24:32.000Z',
          created_at: new Date(),
          updated_at: new Date(),
        },
        { 
          id: 4, 
          user_id: 6,
          department_id: 3,
          staff_number: '004',
          position: 'HOD',
          joined: '2019-07-21T17:24:32.000Z',
          created_at: new Date(),
          updated_at: new Date(),
        },
        { 
          id: 5, 
          user_id: 7,
          department_id: 6,
          staff_number: '005',
          position: 'HOD',
          joined: '2019-07-21T17:24:32.000Z',
        }
      ]));
};
