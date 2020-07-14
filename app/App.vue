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
                                    href="#"
                                >
                                    Help
                                </b-nav-item>
                                <b-nav-item
                                    href="#"
                                >
                                    Community
                                </b-nav-item>
                                <b-nav-item
                                    href="#"
                                >
                                    Status
                                </b-nav-item>
                            </b-navbar-nav>

                            <!-- Center Logo -->
                            <b-navbar-nav class="ml-auto">
                                <b-navbar-brand
                                    class="d-none d-lg-block text-center"
                                    href="#"
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
                                    <b-nav-item href="#">
                                        Tomochain.com
                                    </b-nav-item>
                                    <b-nav-item
                                        href="#"
                                    >
                                        Twitter
                                    </b-nav-item>
                                    <b-nav-item
                                        href="#"
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
                    <div class="row flex-row-reverse">
                        <div class="col-md-6">
                            <b-img
                                src="/app/assets/images/banner.png"
                                alt="banner.png"
                            />
                        </div>
                        <div class="col-md-6">
                            <h2 class="text-light tm-font-size-6">
                                Tomochain Systems
                                <br>
                                <span class="text-blue">Status</span> Overall
                            </h2>
                            <a
                                href="#"
                                target="_blank"
                                class="tm-btn-link mt-3"
                            >
                                <span class="d-flex align-content">
                                    <b-icon
                                        icon="check"
                                        font-scale="1.5"
                                    />All Systems Operational
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
                            TomoStatus © 2020 - v1.1.1
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'App',
    components: {
    },
    data () {
        return {}
    },
    computed: { },
    async updated () { },
    destroyed () { },
    created: async function () { },
    methods: { }
}
</script>
