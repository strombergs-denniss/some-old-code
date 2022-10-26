const CONFIG = {
    POSTGRE_SQL: {
        host: process.env.PSQL_HOST,
        port: process.env.PSQL_PORT,
        user: process.env.PSQL_USER,
        password: process.env.PSQL_PASSWORD,
        database: process.env.PSQL_DATABASE
    },
    MONGO_DB: process.env.MDB_URL
}

module.exports = CONFIG
