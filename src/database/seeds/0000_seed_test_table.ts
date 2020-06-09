import Knex from 'knex'

export async function seed(knex: Knex) {
    const item = (name: string, age: number) => {
        return {
            name,
            age
        }
    }
    await knex('test').insert([
        item("A person", 18),
        item("other person", 9),
        item("Some other person", 12)
    ]);
}