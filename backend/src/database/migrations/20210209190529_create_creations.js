
exports.up = function (knex) {
  return knex.schema.createTable('creations', function (table) {
    table.increments();

    table.string('title').notNullable();
    table.string('type').notNullable();
    table.string('description').notNullable();
    table.string('comments').notNullable();

    table.string('creator_id').notNullable();

    table.foreign('creator_id').references('id').inTable('creators')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('creations');
};
