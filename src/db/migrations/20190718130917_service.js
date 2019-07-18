
exports.up = async function(knex) {
    await knex.schema.createTable('services', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('servicetype_id').unsigned();
        table.foreign('servicetype_id').references('servicetypes.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.string('service_name');
        table.string('description');
        table.integer('price');
        table.integer('available').unsigned().defaultTo(1);
        table.timestamps();
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('services');
};

// services
// =========
// id
// service_name
// description
// servicetype_id
// price
// available = true/false