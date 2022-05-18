import { createRouter, createWebHistory } from 'vue-router'
import oidc from '../oidc'
import DirectoryView from '../views/DirectoryView.vue'
import ProfileView from '../views/ProfileView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import ErrorView from '../views/ErrorView.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: DirectoryView,
        meta: {
            authName: oidc.authName
        }
    },
    {
        path: '/',
        name: 'Profile',
        component: ProfileView,
        props: true,
        meta: {
            authName: oidc.authName
        }
    },
    {   
        // Deeper Link
        path: '/profile/:profileId',
        name: 'ProfileById',
        component: ProfileView,
        props: true,
        meta: {
            authName: oidc.authName
        }
    },
    {
        path: '/error',
        name: 'Error',
        component: ErrorView,
        meta: {
            authName: oidc.authName
        }
    },
    {
        path: '/:catchAll(.*)*',
        name: '404',
        component: NotFoundView,
        meta: {
            authName: oidc.authName
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

oidc.useRouter(router)

export default router