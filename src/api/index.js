import axios from 'axios'

var baseurl = 'https://api.bg.dev.wtfender.com'

/*
function showError(title, msg) {
    var toast = document.getElementById('error')
    document.getElementById('errorTitle').innerHTML = title
    document.getElementById('errorMsg').innerHTML = msg
    toast.style.opacity = "1"
    setTimeout(function() {
        toast.style.opacity = "0"
    }, 15000)
}
*/

class Api {
    constructor() {
        let service = axios.create()
        service.defaults.withCredentials = true
        service.interceptors.response.use(this.handleSuccess, this.handleError)
        service.defaults.baseURL = baseurl
        this.service = service
    }

    handleSuccess(response) {
        return response
    }

    handleError = (error) => {
        console.log(error)
        /*
        TODO 401 & 5xx
        var title = error.response.data
        switch (title) {
            case 'LobbyMax':
                showError(title, 'Max number of lobbies created (3)');
                break
            case 'LobbyMaxUsers':
                showError(title, 'Lobby is at max capacity');
                break
            case 'LobbyNotFound':
                showError(title, 'Lobby does not exist');
                break
            case 'LobbyUserExists':
                showError(title, 'User is already in the lobby');
                break
            case 'LobbyPermissions':
                showError(title, 'Invalid permissions for this lobby');
                break
            default:
                showError('Error', 'Unknown error occurred')
        }
        */
        return Promise.reject(error)
    }

    get(path, token, callback) {
        return this.service.get(path, {
            headers: {
                'Authorization': token
            }
        }).then(
            (response) => callback(response.data)
        )
    }

    post(path, token, payload, callback) {
        return this.service.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload,
            headers: {
                'Authorization': token
            }
        }).then((response) => callback(response.data))
    }

    getDirectory(token, callback){
        this.get('/directory', token, callback)
    }

    /*
    listLobbies(token, callback) {
        if (MOCK) {
            return MOCK_DELAY(callback, MOCK_LOBBIES)
        } else {
            this.get('/lobby', token, callback)
        }
    }

    
    getLobby(token, lobbyId, callback) {
        if (MOCK) {
            return MOCK_DELAY(callback, MOCK_LOBBY(lobbyId))
        } else {
            var data = { 'lobbyId': lobbyId }
            this.post('/lobby', token, data, callback)
        }
    }

    declineLobby(token, lobbyId, groupId, callback) {
        if (MOCK) {
            return MOCK_DELAY(callback, MOCK_LOBBY(lobbyId))
        } else {
            this.post('/lobby/decline', token, { 'lobbyId': lobbyId, 'groupId': groupId }, callback)
        }
    }

    joinLobby(token, lobbyId, groupId, callback) {
        if (MOCK) {
            return MOCK_DELAY(callback, MOCK_LOBBY(lobbyId))
        } else {
            this.post('/lobby/join', token, { 'lobbyId': lobbyId, 'groupId': groupId }, callback)
        }
    }

    deleteLobby(token, lobbyId, groupId, callback) {
        if (MOCK) {
            return MOCK_DELAY(callback, lobbyId)
        } else {
            this.post('/lobby/delete', token, { 'lobbyId': lobbyId, 'groupId': groupId }, callback)
        }
    }

    newLobby(token, groupId, callback) {
        if (MOCK) {
            showError('test', 'test')
            return MOCK_DELAY(callback, MOCK_LOBBY(`test${Math.round(Math.random() * 100)}`))
        } else {
            this.post('/lobby/new', token, groupId, callback)
        }
    }

    login(oauth, callback) {
        if (MOCK) {
            return MOCK_DELAY(callback, MOCK_LOGIN)
        } else {
            var data = { 'oauth': oauth }
            this.post('/session', 'login', data, callback)
        }
    }
    */
}

export default new Api