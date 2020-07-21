<template>
    <div class="container">
        <!-- <b-spinner
            small
            label="Small Spinner"
        /> -->
        <div id="cal-s-wrap">
            <div
                v-for="(month, index) in months"
                :key="index"
                class="cal-box"
            >
                <div class="cal-s-header">
                    <h6 class="month-name">
                        {{ month.name + ' ' + month.year }}
                    </h6>
                    <span class="cal-percent"></span>
                </div>
                <ul>
                    <template v-if="0 < month.start_offset">
                        <li
                            v-for="n in month.start_offset"
                            :key="'not'+ n"
                            class="day not-in-month"
                        ></li>
                    </template>
                    <li
                        v-for="(day, d_index) in month.days"
                        :key="d_index"
                        class="day"
                        :class="'active'"
                    >
                        <div class="s-tooltip">
                            <div class="date-text">

                            </div>
                            <div class="status-text">
                                No incidents or maintenance related to this downtime.
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'App',
    components: { },
    data () {
        return {
            months: []
        }
    },
    computed: { },
    async updated () { },
    destroyed () { },
    created: async function () {
        this.getData()
    },
    methods: {
        getData: function () {
            this.months = [
                {
                    name: 'May',
                    number_month: 4,
                    start_offset: 5,
                    year: 2020,
                    uptime_percentage: 0.9995779569892472,
                    days: [
                        {
                        color: '#28a745',
                        date: '2020-05-01T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '2020-05-02T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-03T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-04T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#a9aa1a',
                        date: '202005-05T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-06T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-07T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-08T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-09T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-10T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-11T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-12T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-13T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-14T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#afaa18',
                        date: '202005-15T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-16T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-17T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-18T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-19T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-20T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-21T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-22T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-23T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-24T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-25T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-26T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-27T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-28T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-29T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-30T00:00:00.000Z',
                        events: []
                        },
                        {
                        color: '#28a745',
                        date: '202005-31T00:00:00.000Z',
                        events: []
                        }
                    ]
                },
                {
                    name: 'June',
                    year: 2020,
                    number_month: 5,
                    start_offset: 1,
                    days: [
                        {
                        color: '#28a745',
                        date: '202006-01T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-02T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-03T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-04T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-05T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-06T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-07T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-08T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-09T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-10T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-11T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-12T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-13T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-14T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-15T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-16T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-17T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-18T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-19T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-20T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-21T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-22T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-23T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-24T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-25T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-26T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-27T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-28T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: "#e25a14",
                        date: '202006-29T00:00:00.000Z',
                        events: [],
                        "p": 7597,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202006-30T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        }
                    ]
                },
                {
                    name: 'July',
                    number_month: 6,
                    year: 2020,
                    start_offset: 3,
                    days: [
                        {
                        color: '#28a745',
                        date: '202007-01T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202007-02T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202007-03T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202007-04T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202007-05T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202007-06T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202007-07T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: "#a7aa1a",
                        date: '202007-08T00:00:00.000Z',
                        events: [],
                        "p": 1685,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202007-09T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202007-10T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202007-11T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202007-12T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202007-13T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202007-14T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202007-15T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202007-16T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: '#28a745',
                        date: '202007-17T00:00:00.000Z',
                        events: [],
                        "p": 0,
                        "m": 0
                        },
                        {
                        color: "#EAEAEA"
                        },
                        {
                        color: "#EAEAEA"
                        },
                        {
                        color: "#EAEAEA"
                        },
                        {
                        color: "#EAEAEA"
                        },
                        {
                        color: "#EAEAEA"
                        },
                        {
                        color: "#EAEAEA"
                        },
                        {
                        color: "#EAEAEA"
                        },
                        {
                        color: "#EAEAEA"
                        },
                        {
                        color: "#EAEAEA"
                        },
                        {
                        color: "#EAEAEA"
                        },
                        {
                        color: "#EAEAEA"
                        },
                        {
                        color: "#EAEAEA"
                        },
                        {
                        color: "#EAEAEA"
                        },
                        {
                        color: "#EAEAEA"
                        }
                    ]
                }
            ]
        }
    }
}
</script>

<style>
    #cal-s-wrap{
        display: flex;
        justify-content: space-between;
    }
    .cal-box{
        width: 260px;
    }
    .cal-box ul{
        list-style: none;
        padding-left: 0;
    }
    /* .cal-box ul:before{
        content: '';
        clear: both;
        display: table;
    }
    .cal-box ul:after{
        content: '';
        clear: both;
        display: table;
    } */
    .cal-box li{
        float: left;
        width: 32px;
        height: 32px;
        margin-left: 6px;
        margin-bottom: 6px;
        position: relative;
    }
    .cal-box li:nth-child(7n+1){
        margin-left: 0;
    }
    .cal-box .active{
        background-color:#8ED4AB;
    }
    .cal-box .active:hover .s-tooltip{
        display: block;
    }

    .s-tooltip{
        position: absolute;
        display: none;
        background-color: #fff;
        width: 250px;
        z-index: 1;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        padding: 20px 10px;
        margin-top: 12px;
        box-shadow: 0 20px 60px 0 rgba(0, 0, 0, 0.14);
    }
    .s-tooltip:before, .s-tooltip:after{
        content: '';
        bottom: 100%;
        left: 50%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }
    .s-tooltip:before{        
        border-color: rgba(240, 241, 245, 0);
        border-bottom-color: #f0f1f5;
        border-width: 12px;
        margin-left: -12px;
    }
    .s-tooltip:after{
        border-color: rgba(255, 255, 255, 0);
        border-bottom-color: #ffffff;
        border-width: 10px;
        margin-left: -10px;
    }
</style>
