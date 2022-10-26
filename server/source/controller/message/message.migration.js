const { knex } = require('@core/database')

const messageMigration = async () => {
    await knex.schema.hasTable('message').then(exists =>{
        if (!exists) {
            return knex.schema.createTable('message', table => {
                table.increments()
                table.text('content')
                table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
                table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now())
                table.integer('user_id').unsigned().notNullable()
                table.integer('channel_id').unsigned().notNullable()
                table.foreign('user_id').references('id').inTable('user')
                table.foreign('channel_id').references('id').inTable('channel')
            }).then()
        }
    })
}

module.exports = messageMigration
