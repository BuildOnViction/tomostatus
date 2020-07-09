<template>
    <div>
        <Timeline
            id="twitterdev"
            source-type="profile"
            widget-class="mt-3 my-custom-class"/>
    </div>
</template>

<script>
import { Timeline } from 'vue-tweet-embed'
export default {
    name: 'App',
    components: { Timeline },
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
