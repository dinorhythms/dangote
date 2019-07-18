
exports.up = async function(knex) {
    await knex.schema.createTable('guests', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.string('dob');
        table.string('international_passport_no');
        table.string('drivers_lisence');
        table.string('car_brand');
        table.integer('rating').defaultTo(0);
        table.timestamps();
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('guests');
};

// guests
// ==========
// id
// user_id
// dob
// international_passport
// drivers_lisence
// car_brand
// rating