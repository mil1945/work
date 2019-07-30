import {GET, POST, config, DELETE} from './http.constant';

export default class Http {

    static get(path: string, data = null) {
        return Http._request(GET, path, data);
    }

    static post(path: string, data: any) {
        return Http._request(POST, path, data);
    }

    static delete(path: string, data = null) {
        return Http._request(DELETE, path, data);
    }

    static _request(method: string, path: string, data = null) {
        const fetchOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
            //credentials: 'include',
        };

        if (data) {
            fetchOptions['body'] = JSON.stringify(data);
        }

        return fetch(`${config.prefix}:${config.port}/${path}`, <RequestInit>fetchOptions)
            .then(resp => resp.json());
    }
}
