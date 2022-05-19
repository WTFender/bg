import axios from 'axios'
import { Notify } from 'quasar'

var baseurl = 'https://api.bg.dev.wtfender.com'

class Api {
    constructor() {
        let service = axios.create()
        service.defaults.withCredentials = true
        service.interceptors.response.use(this.success, this.error)
        service.defaults.baseURL = baseurl
        this.service = service
    }

    success(response) {
        return response
    }

    error = (error) => {
        var code = error.response.status
        var msg = ''
        if (code == 0){
            msg = 'cors error'
        } else if (code >= 500) {
            msg = 'server error'
        } else if (code >= 400) {
            msg = 'permissions error'
        } else {
            msg = 'unknown error'
        }
        Notify.create({
            message: msg,
            color: 'negative'
        })
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