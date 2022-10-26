const allowedMimeTypes = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'text/plain'
]

const isMimeTypeAllowed = mimeType => {
    return allowedMimeTypes.indexOf(mimeType) > -1
}

const fetchRest = (path, method, body) => {
    return fetch(path, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        if (!res.ok) {
            throw new Error(res.statusText)
        }

        return res
    })
}

const fetchFile = (file) => {
    return fetch('/api/attachment', {
        method: 'POST',
        body: file
    }).then(res => {
        if (!res.ok) {
            throw new Error(res.statusText)
        }

        return res
    })
}

const fetchGraphQl = (query, variables = {}) => {
    return fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    }).then(data => data.json()).then(({ data }) => data)
}

const bem = (block, element = '', modifiers = {}) => {
    const left = block + (element ? '-' + element : '')
    const right = Object.keys(modifiers).map(key => {
        const value = modifiers[key]

        if (value) {
            if (typeof value === 'undefined' || typeof value === 'boolean') {
                return ' _' + key
            } else {
                return ' _' + key + '_' + value
            }
        } else {
            return ''
        }
    }).join('')

    return left + (right ? right : '')
}

const localStorage = {
    setItem: (key, value) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error(error)
        }
    },
    getItem: key => {
        try {
            return JSON.parse(window.localStorage.getItem(key))
        } catch (error) {
            console.error(error)

            return null
        }
    },
    removeItem: key => {
        try {
            window.localStorage.removeItem(key)
        } catch (error) {
            console.error(error)
        }
    }
}

export {
    fetchRest,
    fetchGraphQl,
    fetchFile,
    bem,
    isMimeTypeAllowed,
    localStorage
}
