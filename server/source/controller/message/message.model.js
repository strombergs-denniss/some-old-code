const { knex } = require('@core/database')
const { Model } = require('objection')
const { Attachment } = require('../attachment/attachment.model')

class Message extends Model {
    static get tableName() {
        return 'message'
    }

    static get relationMappings() {
        return {
            attachment: {
                relation: Model.HasManyRelation,
                modelClass: Attachment,
                join: {
                    from: 'message.id',
                    to: 'attachment.message_id'
                }
            }
        }
    }
}

const messageModel = {
    get: ({ id }) => {
        return knex('message').select().where('id', id).then(([row]) => row)
    },
    getAll: async ({ channel_id, pageNumber, pageSize }) => {
        return await Message.query()
            .withGraphFetched('[attachment as attachments]')
            .offset(pageNumber * pageSize)
            .limit(pageSize)
            .where('channel_id', channel_id)
            .orderBy('created_at', 'DESC')
    },
    create: ({ content, user_id, channel_id }) => {
        return knex('message').insert({ content, user_id, channel_id }).returning('*').then(([row]) => row)
    },
    update: ({ id, content, user_id }) => {
        return knex('message').update('content', content).where('id', id).andWhere('user_id', user_id).returning('*').then(([row]) => row)
    },
    delete: ({ id, user_id }) => {
        return knex('message').del().where('id', id).andWhere('user_id', user_id).returning('*').then(([row]) => row)
    }
}

module.exports = messageModel
