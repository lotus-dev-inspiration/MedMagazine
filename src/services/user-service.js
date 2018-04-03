const baseUrl = 'http://127.0.0.1:8000';

export const createUser = (data) => {
    return fetch(baseUrl + '/users/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(data)
    })
}

export const userAuthenticate = (data) => {
    return fetch(baseUrl + '/auth/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(data)
    })
}