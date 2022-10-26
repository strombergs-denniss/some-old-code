const { Model } = require('objection')
const { ObjectId } = require('mongodb')
const { knex, mongoDbClient  } = require('@core/database')
const { isMimeTypeAllowed } = require('@core/utility')

class Attachment extends Model {
    static get tableName() {
        return 'attachment'
    }
}

const attachmentModel = {
    get: ({ id }) => {
        return knex('attachment').select().where('id', id).then(([row]) => row)
    },
    getAll: ({ channel_id, pageNumber, pageSize }) => {
        return knex('attachment').select().offset(pageNumber * pageSize).limit(pageSize).where('channel_id', channel_id).orderBy('created_at', 'DESC').then(rows => rows)
    },
    create: ({ name, message_id, path, type }) => {
        return knex('attachment').insert({ name, message_id, path, type }).returning('*').then(([row]) => row)
    },
    update: ({ id, content, user_id }) => {
        return knex('attachment').update('content', content).where('id', id).andWhere('user_id', user_id).returning('*').then(([row]) => row)
    },
    delete: ({ id, user_id }) => {
        return knex('attachment').del().where('id', id).andWhere('user_id', user_id).returning('*').then(([row]) => row)
    },
    getAttachmentFile: id => {
        const collection = mongoDbClient.db('sandbox').collection('attachment')

        return collection.findOne({ _id: ObjectId(id) }).catch(e => console.error(e))
    },
    createAttachmentFile: file => {
        const collection = mongoDbClient.db('sandbox').collection('attachment')
        const {
            originalname: name,
            mimetype: mimeType,
            encoding,
            buffer,
            size
        } = file

        if (!isMimeTypeAllowed(mimeType)) {
            return null
        }

        return collection.insertOne({
            name,
            mimeType,
            encoding,
            buffer,
            size
        }).then(result => {
            return result.insertedId.toString()
        }).catch(e => console.error(e))
    }
}

module.exports = {
    attachmentModel,
    Attachment
}
