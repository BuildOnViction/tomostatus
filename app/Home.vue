<template>
    <div class="container">
        <div class="pt-5 pb-2">
            <div class="row">
                <div class="col-md-6">
                    <h2>Current Status</h2>
                </div>
                <div class="col-md-6">
                    <p class="text-md-right">
                        Uptime over the past 90 days. <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                        >View historical uptime</a>.
                    </p>
                </div>
            </div>
        </div>
        <div
            v-for="(item, index) in 3"
            :key="index"
            class="tm-item-box my-3"
        >
            <div class="row">
                <div class="col-6">
                    Tomo Operations

                    <b-icon
                        v-b-tooltip.hover
                        icon="question-circle"
                        font-scale="1"
                        title="Web requets for Tomochain.com UI & service"
                    />
                </div>
                <div class="col-6 text-md-right normal">
                    Normal
                </div>
            </div>
            <div class="tm-calendar my-3">
                <ul>
                    <li
                        v-for="(item, index) in 90"
                        :key="index"
                    >
                        <div class="inner-calendar">
                            <div class="cal-detail">
                                <div class="tm-date py-2">
                                    21 Jul 2020
                                </div>
                                <div class="row bg-gray py-2">
                                    <div class="col-6">
                                        Degradation
                                    </div>
                                    <div class="col-6 text-right">
                                        1 mins
                                    </div>
                                </div>
                                <div class="tm-txt py-2">
                                    No incidents or maintenance related to this downtime.
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="row text-black-50">
                <div class="col-6">
                    90 days ago
                </div>
                <div class="col-6 text-md-right">
                    Today
                </div>
            </div>
        </div>
        <div class=" mt-5">
            <h2>TomoChain Social Media Feeds</h2>
            <div class="tm-twtter-box">
                <Timeline
                    id="TomoChainANN"
                    source-type="profile"
                    widget-class="mt-3 my-custom-class"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { Timeline } from 'vue-tweet-embed'
export default {
    name: 'App',
    components: {
        Timeline
    },
    data () {
        return {}
    },
    computed: { },
    async updated () { },
    destroyed () { },
    created: async function () {
        console.log(111)
    },
    methods: { }
}
</script>
