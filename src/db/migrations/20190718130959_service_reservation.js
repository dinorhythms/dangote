
exports.up = async function(knex) {
    await knex.schema.createTable('service_reservations', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('service_id').unsigned();
        table.integer('guest_id').unsigned();
        table.integer('receptionist_user_id').unsigned();
        table.integer('service_staff_id').unsigned();
        table.foreign('service_id').references('services.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.foreign('guest_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.foreign('receptionist_user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.foreign('service_staff_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.datetime('booked_date', { precision: 6 }).notNullable();
        table.integer('paid').defaultTo(0);
        table.integer('processed').defaultTo(0);
        table.integer('approved').defaultTo(0);
        table.integer('cancelled').defaultTo(0);
        table.string('comment');
        table.string('price');
        table.timestamps();
      })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('service_reservations');
};