exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('rooms')
    .del()
    .then(() =>
    // Inserts seed entries
      knex('rooms').insert([
        { 
          id: 1, 
          roomtype_id: 1,
          room_name: 'Lagos',
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
          available: 1,
          condition: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        { 
          id: 2, 
          roomtype_id: 2,
          room_name: 'Kaduna',
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
          available: 1,
          condition: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        { 
          id: 3, 
          roomtype_id: 3,
          room_name: 'Abuja',
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
          available: 1,
          condition: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        { 
          id: 4, 
          roomtype_id: 1,
          room_name: 'Calabar',
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
          available: 1,
          condition: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        { 
          id: 5, 
          roomtype_id: 2,
          room_name: 'Kano',
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
          available: 1,
          condition: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        { 
          id: 6, 
          roomtype_id: 3,
          room_name: 'Osun',
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
          available: 1,
          condition: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },

      ]));
};
