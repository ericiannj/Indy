
exports.up = function (knex) {
  return knex.schema.createTable('creators', function (table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.string('email').notNullable();
    table.string('city').notNullable();
    table.string('country').notNullable();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('creators');
};
