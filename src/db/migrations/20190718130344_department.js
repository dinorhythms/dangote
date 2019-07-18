
exports.up = async function(knex) {
    await knex.schema.createTable('departments', function (table) {
        table.increments('id').unsigned().primary();
        table.string('name').unique().notNullable();
        table.text('description').notNullable();
        table.string('duties').notNullable();
        table.timestamps();
    }) 
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('departments');
};

// departments
// ===========
// id
// name
// description
// duties
