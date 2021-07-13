<template>
  <nav class="nav">
    <transition name="fade">
      <h3 v-if="$route.name === 'index'" class="nav__header">Садок</h3>
      <h3 v-else-if="$route.name === 'create-type'" class="nav__header">
        Створити {{ $route.params.type === 'groups' ? 'Групу' : 'Рослину' }}
      </h3>
      <!-- <h1 v-else-if="$route.name === 'year-number'" class="nav__header">
        {{ currYear }}
      </h1> -->
      <h3
        v-else-if="$route.name !== 'index' || $route.name === 'create-type'"
        class="nav__header"
      >
        <NuxtLink to="/"
          ><span class="material-icons md-24 home">home</span></NuxtLink
        >
        <NuxtLink :to="`/year/${currYear}`">/ {{ currYear }}</NuxtLink>
        <NuxtLink
          v-if="$route.name === 'group-name' || $route.name === 'plant-id'"
          :to="`/group/${currGroup.slug}`"
          >/ {{ decodeURI(currGroup.name) }}</NuxtLink
        >
        <NuxtLink v-if="$route.name === 'plant-id'" :to="`/plant/${plant.id}`">
          / {{ decodeURI(plant.name) }}
        </NuxtLink>
        <!-- {{
          $route.name === 'group-name'
            ? decodeURI(currGroup.name)
            : decodeURI(plantName)
        }} -->
      </h3>
    </transition>
    <div>
      <transition name="fade" mode="out-in">
        <button
          v-if="$route.name === 'create-type'"
          class="nav__add-button"
          @click="() => save($route.params.type)"
        >
          <span class="material-icons md-24">save</span>
        </button>
        <button v-else class="nav__add-button" @click="logout">
          <span class="material-icons md-24">logout</span>
        </button>
      </transition>
    </div>
  </nav>
</template>

<script>
import { fire } from '~/hooks/useFirebase'

export default {
  computed: {
    currGroup() {
      return this.$store.state.currGroup
    },
    currYear() {
      return this.$store.state.currYear
    },
    plant() {
      return this.$store.state.currPlant
    },
  },
  methods: {
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
