import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('test', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('age').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('test')
}