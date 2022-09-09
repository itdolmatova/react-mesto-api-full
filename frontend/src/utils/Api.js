class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse = (res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    };

    postUserInfo(values) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify (values)
        })
            .then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    getCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    postCard(name, link) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    editAvatar(src) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: src
            })
        })
            .then(this._checkResponse);
    }

    setLike(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    deleteLike(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse);
    }
    // другие методы работы с API
}

const api = new Api({
    baseUrl: '//api.place4orthebeauty.dolmatova.nomoredomains.sbs',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });

export default api;