exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('roomtypes')
    .del()
    .then(() =>
    // Inserts seed entries
      knex('roomtypes').insert([
        {
          id: 1,
          name: 'deluxe',
          description: 'deluxe category',
          price: '10000',
          features: 'fan, dstv',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'smart',
          description: 'smart category',
          price: '20000',
          features: 'fan, ac, dstv',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'excel',
          description: 'excel category',
          price: '30000',
          features: 'ac, fan, dstv, big bed, wifi',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]));
};
