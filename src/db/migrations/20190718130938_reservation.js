
exports.up = async function(knex) {
    await knex.schema.createTable('reservations', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('room_id').unsigned();
        table.integer('user_id').unsigned();
        table.integer('hr_user_id').unsigned();
        table.integer('receptionist_user_id').unsigned();
        table.foreign('room_id').references('rooms.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.foreign('hr_user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.foreign('receptionist_user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
        table.datetime('booked_date', { precision: 6 }).notNullable();
        table.datetime('start_date', { precision: 6 }).notNullable();
        table.datetime('end_date', { precision: 6 }).notNullable();
        table.datetime('checkedin_date', { precision: 6 }).notNullable();
        table.datetime('checkout_date', { precision: 6 }).notNullable();
        table.integer('processed').defaultTo(0);
        table.integer('approved').defaultTo(0);
        table.integer('paid').defaultTo(0);
        table.integer('cancelled').defaultTo(0);
        table.string('comment');
        table.timestamps();
      })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('reservations');
};

// reservations
// ===========
// id
// room_id
// user_id
// hrmanager_id
// receptionist = null
// booked_date
// start_date
// end_date
// checked_in_date = null
// checkout_date = null

// processed
// approved = true/false
// paid = true/false
// canceled =true/false
// comments