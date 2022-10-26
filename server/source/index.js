const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const { graphqlHTTP } = require('express-graphql')
const http = require('http')
const { Server } = require('socket.io')
const { postgreSqlClient, mongoDbClient, knex } = require('@core/database')
const migration = require('@core/migration')
const { createSchema } = require('@core/schema')
const { socketAuth } = require('@core/socket')
const { messageCreate, messageUpdate, messageDelete } = require('@controller/message/message.socket')
const { Model } = require('objection')
const accessRouter = require('@controller/access/access.rest')
const customRouter = require('@controller/custom/custom.rest')
const emoteRouter = require('@controller/emote/emote.rest')
const attachmentRouter = require('@controller/attachment/attachment.rest')

postgreSqlClient.connect()
Model.knex(knex)
mongoDbClient.connect()
migration()

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.json())

app.use(cookieParser())

app.use(accessRouter)

app.use('/distribution', express.static(path.resolve('./distribution')))

app.use('/public', express.static(path.resolve('./public')))

app.use(emoteRouter)

app.use(attachmentRouter)

app.use('/api/graphql', graphqlHTTP({
    schema: createSchema(),
    graphiql: true
}))

app.use(customRouter)

io.use(socketAuth)

io.on('connection', socket => {
    socket.on('message.create', messageCreate(io, socket))
    socket.on('message.update', messageUpdate(io, socket))
    socket.on('message.delete', messageDelete(io, socket))
})

server.listen(process.env.PORT)
