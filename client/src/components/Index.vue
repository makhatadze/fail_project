<template>
    <div v-if="$store.state.isUserLoggedIn">
      asdasdasd
    </div>
    <div v-else-if="!$store.state.isUserLoggedIn">
      fghfghgf
    </div>
</template>

<script>
    export default {
      name: 'Index'
    }
</script>

<style scoped>

</style>
