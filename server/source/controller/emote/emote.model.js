const { knex } = require('@core/database')
const { mongoDbClient } = require('@core/database')

const emoteModel = {
    get: ({ id }) => {
        return knex('emote').select().where('id', id).then(([row]) => row)
    },
    getAll: ({ pageNumber, pageSize }) => {
        return knex('emote').select().offset(pageNumber * pageSize).limit(pageSize).then(rows => rows)
    },
    create: ({ code }) => {
        return knex('emote').insert({ code }).returning('*').then(([row]) => row)
    },
    update: ({ id, code }) => {
        return knex('emote').update('code', code).where('id', id).returning('*').then(([row]) => row)
    },
    delete: ({ id }) => {
        return knex('emote').del().where('id', id).returning('*').then(([row]) => row)
    },
    getEmote: (code) => {
        const collection = mongoDbClient.db('sandbox').collection('emote')

        return collection.findOne({ originalname: new RegExp('^' + code + '\\.(png|gif)$') })
            .catch(e => console.error(e))
    }
}

module.exports = emoteModel
