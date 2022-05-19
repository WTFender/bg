import MockProfiles from "./profiles.json";
import MockUser from "./user.json";
import { Notify } from 'quasar'

function MOCK_DELAY(callback, response, notify, endpoint) {
    console.log(endpoint)
    Notify.create({
        message: endpoint,
        color: 'primary'
    })
    return setTimeout(function() { callback(response) }, 500)
}

class MockApi {

    getUser(token, callback, notify){
        return MOCK_DELAY(callback, MockUser, notify, 'mock::get::/user')
    }

    getDirectory(token, callback, notify){
        return MOCK_DELAY(callback, MockProfiles, notify, 'mock::get::/directory')
    }

}

export default new MockApi