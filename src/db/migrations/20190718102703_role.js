
exports.up = async function(knex) {
    await knex.schema.createTable('roles', function (table) {
        table.increments('id').unsigned().primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.timestamps();
      })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('roles');
};

// roles
// ==========
// id
// name = admin/guest/hr_manager/accountant/receptionist/service
// details