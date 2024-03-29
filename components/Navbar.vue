<template>
  <nav class="nav">
    <transition mode="out-in" @enter="enterAnim" @leave="leaveAnim">
      <h3 v-if="$route.name === 'index'" key="1" class="nav__header">Садок</h3>
      <h3 v-else-if="$route.name === 'create-type'" key="2" class="nav__header">
        Створити {{ $route.params.type === 'groups' ? 'Групу' : 'Рослину' }}
      </h3>
      <h3 v-else key="3" class="nav__header">
        <transition-group :css="false" @enter="enterAnim" @leave="leaveAnim">
          <NuxtLink key="1" to="/"
            ><span class="material-icons md-24 home">home</span></NuxtLink
          >
          <NuxtLink key="2" :to="`/${$route.params.year}`">
            / {{ $route.params.year }} </NuxtLink
          ><NuxtLink
            v-if="
              $route.name === 'year-group' || $route.name === 'year-group-id'
            "
            key="3"
            :to="`/${$route.params.year}/${currGroup.slug}`"
            >/ {{ decodeURI(currGroup.name) }}</NuxtLink
          ><NuxtLink
            v-if="$route.name === 'year-group-id'"
            key="4"
            :to="`/${$route.params.year}/${currGroup.slug}/${plant.id}`"
          >
            / {{ decodeURI(plant.name) }}
          </NuxtLink>
        </transition-group>
      </h3>
    </transition>

    <button
      class="nav__add-button"
      @click="
        () =>
          $route.name === 'create-type' ? save($route.params.type) : logout()
      "
    >
      <transition
        :css="false"
        mode="out-in"
        @enter="enterAnim"
        @leave="leaveAnim"
      >
        <span
          v-if="$route.name === 'create-type'"
          key="1"
          class="material-icons md-24"
        >
          save
        </span>
        <span v-else key="2" class="material-icons md-24">logout</span>
      </transition>
    </button>
  </nav>
</template>

<script>
import gsap from 'gsap'

import { fire } from '~/hooks/useFirebase'

export default {
  computed: {
    currGroup() {
      return this.$store.state.currGroup
    },
    plant() {
      return this.$store.state.currPlant
    },
  },
  methods: {
    enterAnim(el, onComplete) {
      gsap.fromTo(
        el,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out', onComplete }
      )
    },
    leaveAnim(el, onComplete) {
      gsap.to(el, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete })
    },
    async logout() {
      this.$store.commit('update', ['authenticated', false])
      this.$store.commit('update', ['currUser', {}])
      this.$router.push({ name: 'login' })
      await fire.auth().signOut()
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  padding: 1rem 1.25rem;
  background-color: var(--primary-color);
  backdrop-filter: blur(1.5px);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 2px 0 rgba($color: #000000, $alpha: 0.25),
    0 0 10px 0 rgba($color: #000000, $alpha: 0.1);

  a {
    text-decoration: none;
    color: currentColor;
    transition: color 150ms ease;

    &:hover {
      color: darken($color: #ffffff, $amount: 15);
    }
  }

  .home {
    transform: translateY(4.5px);
  }

  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
  }

  &__add-button {
    $button-size: 33px;
    width: $button-size;
    height: $button-size;
    border-radius: 50%;
    border: none;
    background-color: transparent;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 200ms ease-out;

    &:hover {
      background-color: rgba($color: #ffffff, $alpha: 0.2);
    }
  }
}
</style>
