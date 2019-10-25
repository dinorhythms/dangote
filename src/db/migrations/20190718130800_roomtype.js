
exports.up = async function(knex) {
    await knex.schema.createTable('roomtypes', function (table) {
        table.increments('id').unsigned().primary();
        table.string('name');
        table.string('description');
        table.integer('price');
        table.string('features');
        table.timestamps();
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('roomtypes');
};