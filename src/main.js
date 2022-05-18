import appConfig from '../config.json'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import oidc from './oidc'
import Api from './api'
import MockApi from './mock'
import { Quasar, Notify, useQuasar } from 'quasar'
import './styles/quasar.sass'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

var quasarUserOptions = {
    config: {},
    plugins: { Notify }
}

oidc.startup().then(ok => {
    if (ok) {
        const app = createApp(App)
        app.config.globalProperties.$oidc = oidc

        if (appConfig.mockApi){
            app.config.globalProperties.$api = MockApi
        } else {
            app.config.globalProperties.$api = Api
        }

        app.config.globalProperties.$q = useQuasar
        app.use(router)
        app.use(Quasar, quasarUserOptions)
        app.mount('#app')
    }
})