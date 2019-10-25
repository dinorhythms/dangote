
exports.up = async function(knex) {
    await knex.schema.createTable('servicetypes', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('department_id').unsigned();
        table.foreign('department_id').references('departments.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.string('servicetype_name');
        table.string('description');
        table.string('type');
        table.timestamps();
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('servicetypes');
};