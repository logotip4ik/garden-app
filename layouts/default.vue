<template>
  <div class="height-100">
    <Navbar></Navbar>
    <Nuxt></Nuxt>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('initDB')
  },
}
</script>
