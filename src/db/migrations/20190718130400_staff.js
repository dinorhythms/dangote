
exports.up = async function(knex) {
    await knex.schema.createTable('staffs', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('user_id').unsigned();
        table.integer('department_id').unsigned();
        table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.foreign('department_id').references('departments.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.string('staff_number').unique().notNullable();
        table.string('position').notNullable();
        table.datetime('joined', { precision: 6 })
        table.timestamps();
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('staffs');
};

// staffs
// ==========
// id
// user_id
// employee_number
// department_id
// position
// joined