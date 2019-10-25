exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('guests')
    .del()
    .then(() =>
    // Inserts seed entries
      knex('guests').insert([
        { 
          id: 1, 
          user_id: 1,
          dob: 'Sept 11th 1990',
          international_passport_no: '01222227',
          drivers_lisence: '004242422',
          car_brand: 'Toyota Camry GHY-234-KJA',
          rating: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        { 
          id: 2, 
          user_id: 2,
          dob: 'Jan 11th 1990',
          international_passport_no: '01222227',
          drivers_lisence: '004242422',
          car_brand: 'Toyota Camry GHY-234-KJA',
          rating: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]));
};
