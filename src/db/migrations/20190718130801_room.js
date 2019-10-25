
exports.up = async function(knex) {
    await knex.schema.createTable('rooms', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('roomtype_id').unsigned();
        table.foreign('roomtype_id').references('roomtypes.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.string('room_name');
        table.string('description');
        table.integer('available').unsigned().defaultTo(1);
        table.integer('condition').unsigned().defaultTo(1);
        table.timestamps();
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('rooms');
};