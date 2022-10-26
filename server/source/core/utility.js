const jwt = require('jsonwebtoken')

const allowedMimeTypes = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'text/plain'
]

const isMimeTypeAllowed = mimeType => {
    return allowedMimeTypes.indexOf(mimeType) > -1
}

const generateToken = ({ id, name, alias }) => {
    return jwt.sign(
        {
            id,
            name,
            alias
        },
        process.env.SECRET,
        {
            algorithm: 'HS512'
        }
    )
}

module.exports = {
    isMimeTypeAllowed,
    generateToken
}
