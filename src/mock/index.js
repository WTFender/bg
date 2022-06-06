import MockProfiles from "./profiles.json";
import MockProfile from "./profile.json";
import MockUser from "./user.json";
import { Notify } from 'quasar'

function MOCK_DELAY(callback, response, endpoint) {
    console.log(endpoint)
    Notify.create({
        message: endpoint,
        color: 'primary'
    })
    return setTimeout(function() { callback(response) }, 500)
}

class MockApi {

    getUser(token, callback){
        return MOCK_DELAY(callback, MockUser, 'mock::get::/user')
    }

    getDirectory(token, callback){
        return MOCK_DELAY(callback, MockProfiles, 'mock::get::/directory')
    }

    deleteComment(token, profileId, callback){
        return MOCK_DELAY(callback, MockProfile, 'mock::delete::/comment')
    }

    updateComment(token, profileId, comment, callback){
        var profile = MockProfile
        profile.comments.push({'user': MockUser.id, 'comment': comment['comment']})
        return MOCK_DELAY(callback, profile, 'mock::post::/comment')
    }

    getImage(token, profileId, callback){
        var logoUrl = "callbackUrl"
        return MOCK_DELAY(callback, logoUrl, `mock::get::/img/${profileId}`)
    }

}

export default new MockApi