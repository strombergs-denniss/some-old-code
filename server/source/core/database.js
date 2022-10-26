const { Client } = require('pg')
const { MongoClient } = require('mongodb')
const Knex = require('knex')
const CONFIG = require('./config')

const postgreSqlClient = new Client(CONFIG.POSTGRE_SQL)

const mongoDbClient = new MongoClient(CONFIG.MONGO_DB)

const knex = Knex({
    client: 'pg',
    connection: CONFIG.POSTGRE_SQL
})

module.exports = {
    postgreSqlClient,
    mongoDbClient,
    knex
}
