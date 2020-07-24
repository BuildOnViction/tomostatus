<template>
    <div class="container">
        <h1 class="s-heading">
            Historical Uptime
        </h1>
        <div class="cal-s-header">
            <div class="show-sys-list">
                <button
                    class="current-value"
                    @click="getDropdown"
                >
                    <span
                        class="selected"
                    >
                        {{ selected.name }}
                    </span>
                    <span class="caret" />
                </button>
                <ul v-if="showDropdown === true">
                    <li
                        v-for="(product, rowIndex) in products"
                        :key="rowIndex"
                        :data-value="product.key"
                        :data-name="product.name"
                        :class="product.key == selected.key ? 'active' : ''"
                        @click="getCurrentSys"
                    >
                        {{ product.name }}
                    </li>
                </ul>
            </div>
            <div class="cal-f-month">
                <span
                    class="prev-month"
                    @click="getDataPrevMonth"
                >
                    <b-icon icon="arrow-left-short" />
                </span>
                <div class="current-month">
                    <span>
                        {{ thisMonth }}
                    </span>
                </div>
                <span
                    class="next-month"
                    @click="getDataNextMonth"
                >
                    <b-icon icon="arrow-right-short" />
                </span>
            </div>
        </div>
        <div
            v-if="values.length > 0"
            id="cal-s-wrap"
        >
            <div
                v-for="(value, index) in values"
                :key="index"
                class="cal-box"
            >
                <div class="cal-s-top">
                    <h6
                        v-if="value.month && value.year"
                        class="month-name"
                    >
                        {{ value.month + ' ' + value.year }}
                    </h6>
                    <!-- <span class="cal-percent"></span> -->
                </div>
                <ul v-if="value.days.length > 0">
                    <template v-if="0 < value.offsetDay">
                        <li
                            v-for="n in value.offsetDay"
                            :key="'not'+ n"
                            class="day not-in-month"
                        />
                    </template>
                    <li
                        v-for="(day, d_index) in value.days"
                        :key="d_index"
                        class="day"
                        :class="day.activeDay + ' ' + day.color"
                    >
                        <div
                            v-if="day.activeDay !== 'f-day'"
                            class="s-tooltip"
                        >
                            <div class="date-text">
                                {{ day.date }}
                            </div>
                            <div
                                v-if="day.status > 0"
                                class="s-wrap"
                            >
                                <div class="s-time bg-gray">
                                    <span class="s-title">
                                        Degradation
                                    </span>
                                    <div class="s-result">
                                        {{ day.status }}
                                    </div>
                                </div>
                                <div class="s-content">
                                    No incidents or maintenance related to this downtime.
                                </div>
                            </div>
                            <div
                                v-else
                                class="status-text"
                            >
                                <div class="s-content no-downtime">
                                    No downtime recorded on this day.
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <p
                    v-else
                    class="no-data-render"
                >
                    No Data
                </p>
            </div>
        </div>
        <p
            v-else
            class="no-data-render"
        >
            No Data
        </p>
        <div class="current-status">
            <router-link to="/">
                <b-icon icon="arrow-left-short" />
                Current Status
            </router-link>
        </div>
        <div class="mt-5">
            <h2>TomoChain Social Media Feeds</h2>
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
const today = new Date()
export default {
    name: 'App',
    components: {
        Timeline
    },
    data () {
        return {
            products: [
                { name: 'TomoChain Public RPC', key:'RPC' },
                { name: 'TomoRelayer', key: 'TOMORELAYER' },
                { name: 'TomoDEX', key: 'TOMODEX' },
                { name: 'TomoScan', key: 'TOMOSCAN' },
                { name: 'TomoBridge', key: 'TOMOBRIDGE' },
                { name: 'TomoWallet', key: 'TOMOWALLET' },
                { name: 'TomoChain Website', key: 'TOMOCHAIN' },
                { name: 'TomoMaster', key: 'TOMOMASTER' },
                { name: 'TomoChain Document Site', key: 'TOMODOCS' }
            ],
            months: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            selected: { name: 'TomoChain Public RPC', key: 'RPC' },
            showDropdown: false,
            values: [], // data render the Calendar
            Month: new Date().getMonth() + 1,
            Year: new Date().getFullYear()
        }
    },
    computed: {
        thisMonth () {
            let prevMonth
            let prevYear
            if (this.Month === 2) {
                prevMonth = this.months[11]
                prevYear = this.Year - 1
            } else if (this.Month === 1) {
                prevMonth = this.months[10]
                prevYear = this.Year - 1
            } else {
                prevMonth = this.months[this.Month - 3]
                prevYear = this.Year
            }
            return prevMonth + ' ' + prevYear + ' to ' + this.months[this.Month - 1] + ' ' + this.Year
        },
        dataNextMonth () {
            if (this.Month === 10) {
                return {
                    month: 1,
                    year: this.Year + 1
                }
            } else if (this.Month === 11) {
                return {
                    month: 2,
                    year: this.Year + 1
                }
            } else if (this.Month === 12) {
                return {
                    month: 3,
                    year: this.Year + 1
                }
            } else {
                return {
                    month: this.Month + 3,
                    year: this.Year
                }
            }
        },
        dataPrevMonth () {
            if (this.Month === 3) {
                return {
                    month: 12,
                    year: this.Year - 1
                }
            } else if (this.Month === 2) {
                return {
                    month: 11,
                    year: this.Year - 1
                }
            } else if (this.Month === 1) {
                return {
                    month: 10,
                    year: this.Year - 1
                }
            } else {
                return {
                    month: this.Month - 3,
                    year: this.Year
                }
            }
        }
    },
    async updated () { },
    destroyed () { },
    created: async function () {
        await this.getData()
    },
    methods: {
        async getData () {
            try {
                const params = {
                    month: this.Month, // 7
                    year: this.Year,
                    selected: this.selected.key
                }
                const query = this.serializeQuery(params)
                const { data } = await axios.get(`/api/status/historical?${query}`)
                const items = []
                await Promise.all(data.results.map(async (d, index) => {
                    const month1 = {
                        days: []
                    } // 7 - 3
                    const month2 = {
                        days: []
                    } // 7 - 2
                    const month3 = {
                        days: []
                    } // 7 - 1
                    if (d.series && d.series.length > 0) {
                        await Promise.all(d.series[0].values.map((s, i) => {
                            const m = new Date(s[0]).getMonth() + 1
                            const y = new Date(s[0]).getFullYear()
                            if (m === this.Month) {
                                let colorClass3 = 'normal' // no error
                                let activeDay = 'active'
                                if (s[1] >= 48) {
                                    colorClass3 = 'stop' // > 12 hours
                                }
                                if (s[1] >= 1) {
                                    colorClass3 = 'pending' // 0 - 12 hours
                                }
                                if (s[0] > today.getTime()) {
                                    activeDay = 'f-day'
                                }
                                month3.month = this.months[m - 1]
                                month3.monthNumber = new Date(s[0]).getMonth()
                                month3.year = y
                                month3.offsetDay = this.getOffset(new Date(s[0]).getMonth(), y)
                                month3.days.push({
                                    color: colorClass3,
                                    date: moment(s[0]).format('DD MMMM YYYY'),
                                    status: s[1],
                                    activeDay
                                })
                            } else if (m === this.Month - 1) {
                                let colorClass2 = 'normal' // no error
                                let activeDay = 'active'
                                if (s[1] >= 48) {
                                    colorClass2 = 'stop' // > 12 hours
                                }
                                if (s[1] >= 1) {
                                    colorClass2 = 'pending' // 0 - 12 hours
                                }
                                if (s[0] > today.getTime()) {
                                    activeDay = 'f-day'
                                }
                                month2.month = this.months[m - 1]
                                month2.monthNumber = new Date(s[0]).getMonth()
                                month2.year = y
                                month2.offsetDay = this.getOffset(new Date(s[0]).getMonth(), y)
                                month2.days.push({
                                    color: colorClass2,
                                    date: moment(s[0]).format('DD MMMM YYYY'),
                                    status: s[1],
                                    activeDay
                                })
                            } else if (m === this.Month - 2) {
                                let colorClass = 'normal' // no error
                                let activeDay = 'active'
                                if (s[1] >= 48) {
                                    colorClass = 'stop' // > 12 hours
                                }
                                if (s[1] >= 1) {
                                    colorClass = 'pending' // 0 - 12 hours
                                }
                                if (s[0] > today.getTime()) {
                                    activeDay = 'f-day'
                                }
                                month1.month = this.months[m - 1]
                                month1.monthNumber = new Date(s[0]).getMonth()
                                month1.year = y
                                month1.offsetDay = this.getOffset(new Date(s[0]).getMonth(), y)
                                month1.days.push({
                                    color: colorClass,
                                    date: moment(s[0]).format('DD MMMM YYYY'),
                                    status: s[1],
                                    activeDay
                                })
                            }
                        }))
                        items.push(month1)
                        items.push(month2)
                        items.push(month3)
                        this.values = items
                    } else {
                        this.values = []
                    }
                }))
            } catch (error) {
                console.log(error)
                this.$toasted.show(error, { type: 'error' })
            }
        },
        getOffset (month, year) {
            return (new Date(year, month)).getDay()
        },
        async getCurrentSys (event) {
            const v = event.target.getAttribute('data-value')
            const n = event.target.getAttribute('data-name')

            this.selected = { name: n, key: v }
            this.showDropdown = !this.showDropdown
            await this.getData()
        },
        getDropdown () {
            this.showDropdown = !this.showDropdown
        },
        async getDataNextMonth () {
            const { month, year } = this.dataNextMonth
            this.Month = month
            this.Year = year
            await this.getData()
        },
        async getDataPrevMonth () {
            const { month, year } = this.dataPrevMonth
            this.Month = month
            this.Year = year
            await this.getData()
        }
    }
}
</script>
