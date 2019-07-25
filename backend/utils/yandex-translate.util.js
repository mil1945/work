import fetch from 'node-fetch'

const API_KEY = 'trnsl.1.1.20190724T132131Z.436fabf2ca5db9d2.34192cf0fa1303fd3ac58913be3ef56c63df9673';

export const getTranslate = (phrase) => {
    const url = new URL('https://translate.yandex.net/api/v1.5/tr.json/translate');

    const params = {
        key: API_KEY,
        text: phrase,
        lang: 'ru-en',
    };

    url.search = new URLSearchParams(params);

    return fetch(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(res => res.json())
        .then(data => data.text);
};
