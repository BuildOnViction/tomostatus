import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuex from 'vuex'
import Toasted from 'vue-toasted'

import Historical from './Historical.vue'
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
        { path: '/historical', component: Historical }
    ]
})

Vue.prototype.serializeQuery = function (params, prefix) {
    const query = Object.keys(params).map((key) => {
        const value = params[key]

        if (params.constructor === Array) {
            key = `${prefix}[]`
        } else {
            if (params.constructor === Object) {
                key = (prefix ? `${prefix}[${key}]` : key)
            }
        }

        return value === 'object' ? this.serializeQuery(value, key) : `${key}=${encodeURIComponent(value)}`
    })

    return [].concat.apply([], query).join('&')
}

new Vue({ // eslint-disable-line no-new
    el: '#app',
    router: router,
    components: { App },
    data: {
        language: 'en'
    },
    template: '<App/>'
})
