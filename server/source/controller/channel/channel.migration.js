const { knex } = require('@core/database')

const channelMigration = async () => {
    await knex.schema.hasTable('channel').then(exists =>{
        if (!exists) {
            return knex.schema.create('channel', table => {
                table.increments()
                table.string('name')
            }).then()
        }
    })
}

module.exports = channelMigration
