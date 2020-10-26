<template>
    <div class="container">
        <div class="pt-5 pb-2">
            <div class="row">
                <div class="col-md-6">
                    <h2>Current Status</h2>
                </div>
                <div class="col-md-6">
                    <p class="text-md-right">
                        Uptime over the past {{ dayNumbers }} days. <a
                            href="/historical"
                            rel="noopener noreferrer"
                        >View historical uptime</a>.
                    </p>
                </div>
            </div>
        </div>
        <div v-if="days.length">
            <div
                v-for="(product, rowIndex) in products"
                :key="rowIndex"
                class="tm-item-box my-3"
            >
                <div class="row">
                    <div class="col-8">
                        {{ product.name }}

                        <b-icon
                            v-b-tooltip.hover
                            icon="question-circle"
                            font-scale="1"
                            :title="product.description"
                        />
                    </div>
                    <div :class="`col-4 text-right ${today[rowIndex].color || ''}`">
                        {{ today[rowIndex].status }}
                    </div>
                </div>
                <div class="tm-calendar my-3">
                    <ul>
                        <li
                            v-for="(item, index) in days[rowIndex].items"
                            :id="index"
                            :key="index"
                            :class="item[2]"
                        >
                            <div class="inner-calendar">
                                <div class="cal-detail">
                                    <div class="tm-date py-2">
                                        {{ item[0] }}
                                    </div>
                                    <div v-if="item[1] > 0">
                                        <div class="row bg-gray py-2">
                                            <div class="col-6">
                                                Degradation
                                            </div>
                                            <div
                                                class="col-6 text-right"
                                                :alt="item[1]">
                                                {{ calculatePercentage(item[1]) }}%
                                            </div>
                                        </div>
                                        <div class="tm-txt py-2">
                                            No incidents or maintenance related to this downtime.
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="tm-txt py-2">
                                            No downtime recorded on this day.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="row text-black-50">
                    <div class="col-8">
                        {{ dayNumbers }} days ago
                    </div>
                    <div class="col-4 text-right">
                        Today
                    </div>
                </div>
            </div>
        </div>
        <div class=" mt-5">
            <h2>TomoChain Status Social Media Feeds</h2>
            <div class="tm-twtter-box">
                <Timeline
                    id="TomoChainStatus"
                    source-type="profile"
                    widget-class="mt-3 my-custom-class"
                    :options="{ tweetLimit: '3' }"
                />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { Timeline } from 'vue-tweet-embed'
export default {
    name: 'App',
    components: {
        Timeline
    },
    data () {
        return {
            products: [
                {
                    name: 'TomoChain Public RPC',
                    description: 'Performance of TomoChain RPC'
                },
                {
                    name: 'TomoChain Document Site',
                    description: 'Performance of Tomochain document website'
                },
                {
                    name: 'TomoChain Website',
                    description: 'Performance of Tomochain website'
                },
                {
                    name: 'TomoMaster',
                    description: 'Performance of TomoMaster'
                },
                // {
                //     name: 'TomoRelayer',
                //     description: 'Performance of TomoRelayer'
                // },
                {
                    name: 'TomoDEX',
                    description: 'Performance of TomoDEX'
                },
                {
                    name: 'TomoScan',
                    description: 'Performance of TomoScan'
                },
                {
                    name: 'TomoBridge',
                    description: 'Performance of TomoBridge'
                },
                {
                    name: 'TomoWallet',
                    description: 'Performance of TomoWallet'
                }
            ],
            status: [],
            days: [],
            today: [],
            screenSize: window.innerWidth,
            dayNumbers: 90
        }
    },
    computed: { },
    async updated () { },
    destroyed () { },
    watch: {
        screenSize: async function (newValue) {
            await this.responsiveData(newValue)
        }
    },
    created: async function () {
        window.onresize = () => {
            this.screenSize = window.innerWidth
        }
        await this.getCurrentStatus()
        await this.getData()
    },
    methods: {
        async getData () {
            try {
                const { data } = await axios.get('/api/status')
                const items = []
                await Promise.all(data.results.map((d, index) => {
                    items[index] = {
                        productId: d.statement_id,
                        items: d.series[0].values.map(v => {
                            let color = 'normal' // no error

                            if (v[1] >= 1) {
                                color = 'pending' // 0 - 12 hours
                            }

                            if (v[1] >= 48) {
                                color = 'stop' // > 12 hours
                            }
                            return [
                                moment(v[0]).format('DD MMMM YYYY'),
                                v[1],
                                color
                            ]
                        })
                    }
                }))
                this.status = items
                this.days = items
                await this.responsiveData(this.screenSize)
            } catch (error) {
                console.log(error)
                this.$toasted.show(error, { type: 'error' })
            }
        },
        async getCurrentStatus () {
            try {
                const { data } = await axios.get('/api/status/currentStatus')
                const items = []
                await Promise.all(data.results.map((d, index) => {
                    items[index] = {
                        productId: d.statement_id,
                        status: '',
                        color: ''
                    }
                    if (d.series && d.series.length > 0) {
                        d.series[0].values.map(v => {
                            let color = 'normal' // no error
                            if (new Date(v[0]).getDate() === new Date().getDate()) {
                                let status = 'Normal'

                                if (v[1] >= 1) {
                                    color = 'pending' // 0 - 12 hours
                                    status = 'Degraded'
                                }
                                if (v[1] >= 48) {
                                    color = 'stop' // > 12 hours
                                    status = 'Incident'
                                }
                                items[index].color = color
                                items[index].status = status
                            }
                        })
                    } else {
                        items[index].status = 'Normal'
                        items[index].color = 'normal'
                    }
                }))
                this.today = items
            } catch (error) {
                console.log(error)
                this.$toasted.show(error, { type: 'error' })
            }
        },
        async getTodayData () {
            try {
                const { data } = await axios.get('/api/status/today')
                const items = []
                await Promise.all(data.results.map((d, index) => {
                    console.log(d)
                    items[index] = {
                        productId: d.statement_id,
                        status: '',
                        color: ''
                    }
                    if (d.series && d.series.length > 0) {
                        d.series[0].values.map(v => {
                            let color = 'normal' // no error
                            if (new Date(v[0]).getDate() === new Date().getDate()) {
                                let status = 'Normal'
                                if (v[1] >= 48) {
                                    color = 'stop' // > 12 hours
                                    status = 'Incident'
                                }
                                if (v[1] >= 1) {
                                    color = 'pending' // 0 - 12 hours
                                    status = 'Degraded'
                                }
                                items[index].color = color
                                items[index].status = status
                            }
                        })
                    } else {
                        items[index].status = 'Normal'
                        items[index].color = 'normal'
                    }
                }))
                this.today = items
            } catch (error) {
                console.log(error)
                this.$toasted.show(error, { type: 'error' })
            }
        },
        calculatePercentage (current, total = 96) {
            if (current >= total) {
                return 100
            } else {
                return Math.floor((current * 100) / total)
            }
        },
        async sliceData (sliceNumber = 0) {
            const clone = JSON.parse(JSON.stringify(this.status))
            const a = await Promise.all(clone.map(c => {
                c.items = c.items.slice(Math.max(c.items.length - sliceNumber, 0))
                return c
            }))
            return a
        },
        async responsiveData (screenValue) {
            if (screenValue <= 600) {
                this.dayNumbers = 30
                if (this.days[0].items.length > 30) {
                    this.days = await this.sliceData(30)
                }
            } else if (screenValue <= 1024) {
                this.dayNumbers = 60
                if (this.days[0].items.length === 30 ||
                    this.days[0].items.length > 60) {
                    this.days = await this.sliceData(60)
                }
            } else if (screenValue > 1024) {
                this.dayNumbers = 90
                this.days = this.status
            }
        }
    }
}
</script>
