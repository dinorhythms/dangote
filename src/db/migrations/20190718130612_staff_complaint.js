
exports.up = async function(knex) {
    await knex.schema.createTable('staff_complaints', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.string('title');
        table.text('details');
        table.timestamps();
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('staff_complaints');
};