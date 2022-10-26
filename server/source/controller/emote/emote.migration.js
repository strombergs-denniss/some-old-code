const { knex } = require('@core/database')

const emoteMigration = async () => {
    await knex.schema.hasTable('emote').then(exists =>{
        if (!exists) {
            return knex.schema.createTable('emote', table => {
                table.increments()
                table.string('code')
            }).then()
        }
    })
}

module.exports = emoteMigration
