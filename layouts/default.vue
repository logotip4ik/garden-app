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

<style>
/* THIS IS PRIMARY COLOR(probaly need to use it) #00b8bf */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
/* ::selection {
  background-color: #007661;
} */
body,
html {
  font-family: 'Noto Sans', sans-serif;
  min-height: 100vh;
}
.height-100 {
  min-height: 100vh;
}
</style>
