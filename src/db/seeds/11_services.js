exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('services')
    .del()
    .then(() =>
    // Inserts seed entries
      knex('services').insert([
        {
          id: 1,
          servicetype_id: 1,
          service_name: 'Pepper Soup',
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
          price: '500',
          available: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          servicetype_id: 1,
          service_name: 'Fried rice and chicken',
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
          price: '1500',
          available: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          servicetype_id: 2,
          service_name: 'Malt',
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
          price: '500',
          available: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          servicetype_id: 3,
          service_name: 'Mob',
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
          price: '2000',
          available: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]));
};
