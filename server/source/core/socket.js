const cookie = require('cookie')
const jwt = require('jsonwebtoken')

const socketAuth = (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie)
    const token = cookies['token']

    if (token) {
        jwt.verify(token, process.env.SECRET, (e, user) => {
            if (!e) {
                socket.user = user

                next()
            }
        })
    }
}

module.exports = {
    socketAuth
}
