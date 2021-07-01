<template>
  <nav class="nav">
    <transition name="fade">
      <h1 v-if="$route.name === 'index'" class="nav__header">Город</h1>
      <h1 v-else-if="$route.name === 'create-type'" class="nav__header">
        Створити
      </h1>
      <h1 v-else-if="$route.name === 'group-name'" class="nav__header">
        Рослини
      </h1>
      <h1 v-else-if="$route.name === 'plant-name'" class="nav__header">
        {{ decodeURI(plantName) }}
      </h1>
    </transition>
    <transition name="fade" mode="out-in">
      <button
        v-if="$route.name === 'index' || $route.name === 'group-name'"
        class="nav__add-button"
        @click="
          () =>
            $router.push({
              name: 'create-type',
              params: {
                type:
                  $route.name === 'index'
                    ? 'groups'
                    : $route.name === 'group-name'
                    ? 'plants'
                    : 'date',
              },
            })
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
import useDB from '~/hooks/useDB'

export default {
  data: () => ({
    plantName: '',
  }),
  watch: {
    '$route.name'(name) {
      if (name === 'plant-name') this.getPlantName(this.$route.params.name)
    },
  },
  methods: {
    ...mapActions({ save: 'saveForm' }),
    async getPlantName(plantSlug) {
      const db = useDB()
      const plant = await db.table('plants').get({ slug: plantSlug })
      this.plantName = plant.name
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
