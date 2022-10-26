const { knex } = require('@core/database')

const channelModel = {
    get: ({ id }) => {
        return knex('channel').select().where('id', id).then(([row]) => row)
    },
    getAll: () => {
        return knex('channel').select().orderBy('id', 'ASC').then(rows => rows)
    },
    create: ({ name }) => {
        return knex('channel').insert({ name }).returning('*').then(([row]) => row)
    },
    update: ({ id, name }) => {
        return knex('channel').update('name', name).where('id', id).returning('*').then(([row]) => row)
    },
    delete: ({ id }) => {
        return knex('channel').del().where('id', id).returning('*').then(([row]) => row)
    }
}

module.exports = channelModel
