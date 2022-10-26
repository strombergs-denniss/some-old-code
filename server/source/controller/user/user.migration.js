const { knex } = require('@core/database')

const userMigration = async () => {
    await knex.schema.hasTable('user').then(exists =>{
        if (!exists) {
            return knex.schema.createTable('user', table => {
                table.increments()
                table.string('name').unique()
                table.string('password')
                table.string('alias')
                table.string('picture')
            }).then()
        }
    })
}

module.exports = userMigration
