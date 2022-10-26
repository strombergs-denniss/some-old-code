const { knex } = require('@core/database')

const attachmentMigration = async () => {
    await knex.schema.hasTable('attachment').then(exists =>{
        if (!exists) {
            return knex.schema.createTable('attachment', table => {
                table.increments()
                table.string('name')
                table.string('path')
                table.string('type')
                table.integer('message_id').unsigned().notNullable()
                table.foreign('message_id').references('id').inTable('message').onDelete('CASCADE')
            }).then()
        }
    })
}

module.exports = attachmentMigration
