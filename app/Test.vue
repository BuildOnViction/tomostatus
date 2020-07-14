<template>
    <div>
        <b-spinner
            small
            label="Small Spinner"
        />
    </div>
</template>

<script>

export default {
    name: 'App',
    components: { },
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
