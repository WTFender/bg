import MockProfiles from "./profiles.json";
import MockUser from "./user.json";

function MOCK_DELAY(callback, response, notify, endpoint) {
    console.log('MOCK RESPONSE')
    notify('mock::' + endpoint)
    // simulate delay
    return setTimeout(function() { callback(response) }, 500)
}

class MockApi {

    getDirectory(token, callback, notify){
        var response = {
            user: MockUser,
            profiles: MockProfiles
        }
        return MOCK_DELAY(callback, response, notify, 'get::/directory')
    }

}

export default new MockApi