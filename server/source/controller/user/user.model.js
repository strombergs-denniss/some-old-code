const { knex } = require('@core/database')

const userModel = {
    get: ({ id }) => {
        return knex('user').select().where('id', id).then(([row]) => row)
    },
    getByName: ({ name }) => {
        return knex('user').select().where('name', name).then(([row]) => row)
    },
    getAll: () => {
        return knex('user').select().orderBy('id', 'ASC').then(rows => rows)
    },
    create: ({ name, password, alias, picture }) => {
        return knex('user').insert({ name, password, alias, picture }).returning('*').then(([row]) => row).catch(error => console.error(error))
    },
    update: ({ id, name, alias, picture }) => {
        return knex('user').update({ name, alias, picture }).where('id', id).returning('*').then(([row]) => row)
    }
}

module.exports = userModel
