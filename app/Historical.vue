<template>
    <div>
        <b-spinner
            small
            label="Small Spinner"
        />
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
    name: 'App',
    components: { },
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
            value: [],
            fromMonth: new Date().getMonth() + 1,
            fromYear: new Date().getFullYear()
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
                const params = {
                    month: this.fromMonth, // 7
                    year: this.fromYear
                }
                const query = this.serializeQuery(params)
                const { data } = await axios.get(`/api/status/historical?${query}`)
                const items = []
                const month1 = {
                    days: []
                } // 7 - 3
                const month2 = {
                    days: []
                } // 7 - 2
                const month3 = {
                    days: []
                } // 7 - 1
                await Promise.all(data.results.map(async (d, index) => {
                    items[index] = {
                        productId: d.statement_id
                    }
                    await Promise.all(d.series[0].values.map((s, i) => {
                        const m = new Date(s[0]).getMonth() + 1
                        const y = new Date(s[0]).getFullYear()

                        if (m === this.fromMonth) {
                            let colorClass3 = 'normal' // no error
                            if (s[1] >= 48) {
                                colorClass3 = 'stop' // > 12 hours
                            }
                            if (s[1] >= 1) {
                                colorClass3 = 'pending' // 0 - 12 hours
                            }
                            month3.month = this.months[m]
                            month3.monthNumber = new Date(s[0]).getMonth()
                            month3.year = y
                            month3.days[i] = {
                                color: colorClass3,
                                date: moment(s[0]).format('DD MMMM YYYY')
                            }
                        }
                        if (m === this.fromMonth - 1) {
                            let colorClass2 = 'normal' // no error
                            if (s[1] >= 48) {
                                colorClass2 = 'stop' // > 12 hours
                            }
                            if (s[1] >= 1) {
                                colorClass2 = 'pending' // 0 - 12 hours
                            }
                            month2.month = this.months[m]
                            month2.monthNumber = new Date(s[0]).getMonth()
                            month2.year = y
                            month2.days[i] = {
                                color: colorClass2,
                                date: moment(s[0]).format('DD MMMM YYYY')
                            }
                        }
                        if (m === this.fromMonth - 2) {
                            let colorClass = 'normal' // no error
                            if (s[1] >= 48) {
                                colorClass = 'stop' // > 12 hours
                            }
                            if (s[1] >= 1) {
                                colorClass = 'pending' // 0 - 12 hours
                            }
                            month1.month = this.months[m]
                            month1.monthNumber = new Date(s[0]).getMonth()
                            month1.year = y
                            month1.days[i] = {
                                color: colorClass,
                                date: moment(s[0]).format('DD MMMM YYYY')
                            }
                        }
                    }))
                    items[index].months = []
                    items[index].months.push(month1)
                    items[index].months.push(month2)
                    items[index].months.push(month3)
                }))
            } catch (error) {
                console.log(error)
                this.$toasted.show(error, { type: 'error' })
            }
        }
    }
}
</script>
