import baseUrl from 'helpers/baseUrl';
import { getCookie } from 'services/cookie-service';

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

export const getArticles = () => {
    return fetch(baseUrl + '/articles/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })
}

export const changeArticle = (article) => {
    return fetch(`${baseUrl}/articles/${article.id}/`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(article)
    })
}

export const getArticleComments = (articleId) => {
    return fetch(`${baseUrl}/articles/${articleId}/comments/`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })
}
