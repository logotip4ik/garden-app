<template>
  <transition name="fade">
    <button
      v-if="
        $route.name !== 'create-type' &&
        $route.name !== 'plant-name' &&
        $route.name !== 'index'
      "
      class="fab"
      @click="
        () =>
          $router.push({
            name: 'create-type',
            params: {
              type: $route.name === 'group' ? 'groups' : 'plants',
            },
          })
      "
    >
      <span class="material-icons .md-48">add</span>
    </button>
  </transition>
</template>

<script>
export default {}
</script>

<style lang="scss">
.fab {
  $fab-size: 50px;
  position: fixed;
  bottom: clamp(1rem, 5%, 4rem);
  right: clamp(1rem, 10%, 4rem);
  // bottom: clamp(2rem, 1vh, 4rem);
  // right: clamp(2rem, 10vw, 4rem);
  border-radius: 50%;
  box-shadow: 0 0 2px rgba($color: #000000, $alpha: 0.25),
    1px 5px 10px rgba($color: #000000, $alpha: 0.25);
  background-color: var(--secondary-color);
  border: none;
  width: $fab-size;
  height: $fab-size;
  cursor: pointer;
  transition: background-color 200ms ease-out, color 200ms ease-out;
  // color: white;

  &:hover {
    background-color: var(--secondary-color-dark);
    color: white;
  }
}
</style>
