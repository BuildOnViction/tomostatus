<template>
    <div id="app">
        <div
            class="header-page pb-1"
        >
            <div class="tm-main-navbar">
                <div class="container">
                    <b-navbar
                        toggleable="lg"
                        type="dark"
                        class="px-0"
                    >
                        <!-- Center Logo -->
                        <b-navbar-brand
                            href="#"
                            class="d-block d-lg-none"
                        >
                            <b-img
                                src="/app/assets/images/logo-tomostatus.svg"
                                alt="logo-tomostatus.svg"
                            />
                        </b-navbar-brand>

                        <b-navbar-toggle target="nav-collapse" />

                        <b-collapse
                            id="nav-collapse"
                            is-nav
                        >
                            <!-- Left nav items -->
                            <b-navbar-nav>
                                <b-nav-item
                                    href="/"
                                >
                                    Help
                                </b-nav-item>
                                <b-nav-item
                                    href="https://forum.tomochain.com/"
                                >
                                    Community
                                </b-nav-item>
                                <b-nav-item
                                    href="/"
                                >
                                    Status
                                </b-nav-item>
                            </b-navbar-nav>

                            <!-- Center Logo -->
                            <b-navbar-nav class="ml-auto">
                                <b-navbar-brand
                                    class="d-none d-lg-block text-center"
                                    href="/"
                                >
                                    <b-img
                                        src="/app/assets/images/logo-tomostatus.svg"
                                        alt="logo-tomostatus.svg"
                                    />
                                </b-navbar-brand>
                            </b-navbar-nav>

                            <!-- Right nav items -->
                            <b-navbar-nav class="ml-auto">
                                <b-navbar-nav>
                                    <b-nav-item href="https://tomochain.com/">
                                        TomoChain.com
                                    </b-nav-item>
                                    <b-nav-item
                                        href="https://twitter.com/TomoChainANN"
                                    >
                                        Twitter
                                    </b-nav-item>
                                    <b-nav-item
                                        href="/"
                                    >
                                        Subscribe
                                    </b-nav-item>
                                </b-navbar-nav>
                            </b-navbar-nav>
                        </b-collapse>
                    </b-navbar>
                </div>
            </div>
            <div class="tm-banner my-5 pt-3">
                <div class="container">
                    <div class="row align-items-center flex-row-reverse">
                        <div class="col-md-6 mb-4 mb-md-0">
                            <b-img
                                src="/app/assets/images/banner.png"
                                alt="banner.png"
                            />
                        </div>
                        <div class="col-md-6">
                            <h2 class="text-light tm-font-size-6">
                                TomoChain Systems
                                <br>
                                <span class="text-blue">Status</span> Overall
                            </h2>
                            <a
                                :class="`tm-btn-link mt-3 ${currentStatus}`"
                            >
                                <span class="d-flex align-content">
                                    <div
                                        v-if="!currentLabel"
                                    >
                                        <b-icon
                                            icon="check"
                                            font-scale="1.5"
                                        />All Systems Operational
                                    </div>
                                    <div
                                        v-else
                                    >
                                        <b-icon
                                            icon="cone-striped"
                                            font-scale="1.5"
                                        />
                                        {{ currentLabel }}
                                    </div>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <router-view />
        <div class="footer-page">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="text-center py-3">
                            TomoStatus © 2020 - v{{ version }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import pkg from '../package.json'
export default {
    name: 'App',
    components: {
    },
    data () {
        return {
            version: pkg.version,
            currentStatus: '',
            currentLabel: '',
            products: [
                'TomoChain Public RPC',
                'TomoChain Document Site',
                'TomoChain Website',
                'TomoMaster',
                // 'TomoRelayer',
                'TomoDEX',
                'TomoScan',
                'TomoBridge',
                'TomoWallet'
            ]
        }
    },
    computed: { },
    async updated () { },
    destroyed () { },
    created: async function () {
        await this.getCurrentStatus()
    },
    methods: {
        async getCurrentStatus () {
            try {
                const { data } = await axios.get('/api/status/currentStatus')
                let status = 'normal'
                let label = ''
                await Promise.all(data.results.map((d, index) => {
                    if (d.series && d.series.length > 0) {
                        d.series[0].values.map(v => {
                            if (new Date(v[0]).getDate() === new Date().getDate()) {
                                if (v[1] >= 48) {
                                    status = 'stop' // > 12 hours
                                    label = `${this.products[d.statement_id]} is Incident`
                                }
                                if (v[1] >= 1) {
                                    status = 'pending' // 0 - 12 hours
                                    if (!label) {
                                        label = `${this.products[d.statement_id]} is Degraded`
                                    }
                                }
                            }
                        })
                    }
                }))
                this.currentStatus = status
                this.currentLabel = label
            } catch (error) {
                console.log(error)
                this.$toasted.show(error, { type: 'error' })
            }
        }
    }
}
</script>
