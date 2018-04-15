import baseUrl from 'helpers/baseUrl';
import {getCookie} from 'services/cookie-service';

const token = getCookie("Authorization");

export const createArticle = (data) => {
    return fetch(baseUrl + '/articles/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
}