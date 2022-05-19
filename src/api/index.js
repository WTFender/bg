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

    getUser(token, callback){
        this.get('/user', token, callback)
    }

    getDirectory(token, callback){
        this.get('/directory', token, callback)
    }

}

export default new Api