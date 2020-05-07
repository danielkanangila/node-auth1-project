exports.up = function (knex) {
  return knex.schema.createTable("users", (users) => {
    users.increments();
    users.string("email").notNullable().unique();
    users.string("password");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
