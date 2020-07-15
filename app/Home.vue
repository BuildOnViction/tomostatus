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
            v-for="(productName, rowIndex) in products"
            :key="rowIndex"
            class="tm-item-box my-3"
        >
            <div class="row">
                <div class="col-6">
                    {{ productName }}
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
                    />
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
                'RPC',
                'DAPP',
                'TOMODEX',
                'TOMOSCAN',
                'TOMOBRIDGE',
                'TOMOWALLET',
                'TOMOCHAIN',
                'TOMOMASTER',
                'TOMODOCS'
            ],
            days: []
        }
    },
    computed: { },
    async updated () { },
    destroyed () { },
    created: async function () {
        await this.getData()
    },
    methods: {
        async getData () {
            try {
                const { data } = await axios.get('/api/status')
                await Promise.all(data.results.map((d, index) => {
                    this.days[index] = {
                        productId: d.statement_id,
                        items: d.series[0].values.map(v => {
                            return [
                                moment(v[0]).format('DD MMMM YYYY'),
                                v[1]
                            ]
                        })
                    }
                }))
            } catch (error) {
                console.log(error)
                this.$toasted.show(error, { type: 'error' })
            }
        }
    }
}
</script>
