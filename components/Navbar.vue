<template>
  <nav class="nav">
    <transition name="nav-header-slide">
      <h1 v-if="$route.name === 'index'" class="nav__header">Garden</h1>
      <h1 v-else-if="$route.name === 'create-type'" class="nav__header">
        Створити
      </h1>
    </transition>
    <transition>
      <button
        v-if="$route.name === 'index'"
        class="nav__add-button"
        @click="
          () => $router.push({ name: 'create-type', params: { type: 'group' } })
        "
      >
        <span class="material-icons md-24">add</span>
      </button>
      <button
        v-else-if="$route.name === 'create-type'"
        class="nav__add-button"
        @click="() => save($route.params.type)"
      >
        <span class="material-icons md-24">save</span>
      </button>
    </transition>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({ save: 'saveForm' }),
  },
}
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  padding: 1rem 1.25rem;
  background-color: rgba($color: #000000, $alpha: 0.8);
  backdrop-filter: blur(1.5px);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__add-button {
    $button-size: 40px;
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
