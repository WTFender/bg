import { createOidcAuth, SignInType } from 'vue-oidc-client/vue3'
import appConfig from "../../config.json";

var oidc = createOidcAuth('main', SignInType.Window, appConfig.appUrl, {
    authority: appConfig.authority,
    client_id: appConfig.client_id,
    response_type: appConfig.response_type,
    scope: appConfig.scope
})

export default oidc