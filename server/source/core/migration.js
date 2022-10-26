const bcrypt = require('bcrypt')
const userMigration = require('@controller/user/user.migration')
const channelMigration = require('@controller/channel/channel.migration')
const messageMigration = require('@controller/message/message.migration')
const userModel = require('@controller/user/user.model')
const { knex } = require('./database')
const attachmentMigration = require('@controller/attachment/attachment.migration')

const data = [
    {
        create: userModel.create,
        rows: [
            {
                name: 'De',
                password: bcrypt.hashSync('De', 5),
                alias: 'De',
                picture: '/api/attachment/6190b52bd501290808f9322f'
            },
            {
                name: 'Ai',
                password: bcrypt.hashSync('Ai', 5),
                alias: 'Ai',
                picture: '/api/attachment/6190b52bd501290808f9322f'
            },
            {
                name: 'Al',
                password: bcrypt.hashSync('Al', 5),
                alias: 'Al',
                picture: '/api/attachment/6190b52bd501290808f9322f'
            }
        ]
    }
]

const populate = () => {
    data.forEach(({ create, rows }) => {
        rows.forEach(row => {
            create(row)
        })
    })
}

const migration = async () => {
    await knex.raw('DROP TABLE IF EXISTS "attachment", "message", "user";').then()
    await userMigration()
    await channelMigration()
    await messageMigration()
    await attachmentMigration()
    await populate()
}

module.exports = migration
