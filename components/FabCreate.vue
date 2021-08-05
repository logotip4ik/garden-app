<template>
  <transition :css="false" @enter="enterAnim" @leave="leaveAnim">
    <NuxtLink
      v-if="$route.name === 'year' || $route.name === 'year-group'"
      prefetch
      :to="createUrl"
      class="fab"
    >
      <span class="material-icons">add</span>
    </NuxtLink>
  </transition>
</template>

<script>
import gsap from 'gsap'

export default {
  computed: {
    createUrl() {
      const { year } = this.$route.params
      const createType = this.$route.name === 'year' ? 'groups' : 'plants'
      return `/create/${createType}?year=${year}`
    },
  },
  methods: {
    enterAnim(el, onComplete) {
      gsap.fromTo(
        el,
        { scale: 0 },
        { ease: 'back.out', scale: 1, duration: 0.3, onComplete }
      )
    },
    leaveAnim(el, onComplete) {
      gsap.to(el, { ease: 'back.in', scale: 0, duration: 0.3, onComplete })
    },
  },
}
</script>

<style lang="scss">
.fab {
  $fab-size: 50px;
  width: $fab-size;
  height: $fab-size;

  position: fixed;
  bottom: 5%;
  right: 10%;
  bottom: clamp(1rem, 5%, 4rem);
  right: clamp(1rem, 10%, 4rem);
  // bottom: clamp(2rem, 1vh, 4rem);
  // right: clamp(2rem, 10vw, 4rem);

  color: white;
  box-shadow: 0 0 2px rgba($color: #000000, $alpha: 0.25),
    1px 5px 10px rgba($color: #000000, $alpha: 0.25);
  background-color: var(--secondary-color);
  border: none;
  border-radius: 50%;
  text-decoration: none;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: background-color 200ms ease-out, color 200ms ease-out;

  &:hover {
    background-color: var(--secondary-color-dark);
  }
}
</style>
