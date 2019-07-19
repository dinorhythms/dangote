exports.up = async function(knex) {
    await knex.schema.createTable('users', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('role_id').unsigned();
        table.string('email').unique().notNullable();
        table.integer('active').defaultTo(1);
        table.string('password').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('phone').notNullable();
        table.string('address').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('postal_code').notNullable();
        table.string('country').notNullable();
        table.string('profile_picture').nullable();
        table.foreign('role_id').references('roles.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.timestamps();
      })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('users');
};

// users
// ==========
// id
// email
// first_name
// last_name
// phone
// address
// city
// state
// postalCode
// country
// picture
// role = role_id