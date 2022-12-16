/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex, Promise) {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id").primary();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("phone_number").notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("current_address").notNullable();
    table.string("city").notNullable();
    table.string("name_of_landlord");
    table.string("occupation").notNullable();
    table.string("company").notNullable();
    table.string("reference");
    table.string("relationship");
    table.string("reference_phone_number");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
