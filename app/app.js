import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuex from 'vuex'
import Toasted from 'vue-toasted'

import Test from './Test.vue'
import Home from './Home.vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Toasted, {
    position: 'bottom-right',
    theme: 'bubble',
    duration: 4000,
    action : {
        text : 'Dismiss',
        onClick : (e, toastObject) => {
            toastObject.goAway(0)
        }
    },
    singleton: true
})

const EventBus = new Vue()

Vue.prototype.$bus = EventBus

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/test', component: Test }
    ]
})

new Vue({ // eslint-disable-line no-new
    el: '#app',
    router: router,
    components: { App },
    data: {
        language: 'en'
    },
    template: '<App/>'
})
