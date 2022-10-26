import { fetchRest } from '@core/utility'

const accessRequest = {
    authorize: (name, password) => {
        return fetchRest('/authorize', 'POST', { name, password })
    },
    revoke: () => {
        return fetchRest('/revoke', 'POST', {})
    }
}

export default accessRequest
