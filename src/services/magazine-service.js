import baseUrl from 'helpers/baseUrl';
import { getCookie } from 'services/cookie-service';

const token = getCookie("Authorization");

export const getMagazines = () => {
    return fetch(baseUrl + '/journals/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })
} 

export const getMagazine = (id) => {
    return fetch(baseUrl + '/journals/' + id,  {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })
}