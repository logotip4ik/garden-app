<template>
  <div class="group">
    <h2 class="group__header">{{ decodeURI(group.name) }}:</h2>
    <ul v-if="plants.length !== 0" class="group__plants">
      <li
        v-for="plant in plants"
        :key="plant.id"
        class="group__plants__item"
        @click="
          () =>
            $router.push({
              name: 'plant-name',
              params: { name: plant.slug },
            })
        "
      >
        <h2 class="group__plants__item__header">{{ decodeURI(plant.name) }}</h2>
      </li>
    </ul>
    <div v-else class="empty">
      У вас не має жодної рослини.<br />
      Натисніть &plus; що б створити нову рослину
    </div>
  </div>
</template>

<script>
import useDB from '~/hooks/useDB'

export default {
  async asyncData({ store, params }) {
    const db = useDB()

    const group = await db.table('groups').get({ slug: params.name })
    const plants = await db
      .table('plants')
      .where({ group: group.slug })
      .toArray()

    store.commit('update', ['currGroup', group])

    return { group, plants }
  },
}
</script>

<style lang="scss" scoped>
.group {
  &__header {
    padding: 1rem;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.5);
  }
  &__plants {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 450px;
    margin: 0 auto;
    list-style-type: none;

    &__item {
      border-radius: 0;
      width: 100%;
      padding: 1rem 1.5rem;
      padding-left: 2.5rem;
      cursor: pointer;
      background-color: transparent;
      transition: background-color 200ms ease-out;

      &:hover {
        background-color: rgba($color: #000000, $alpha: 0.1);
      }

      &:not(:last-child) {
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.25);
      }

      &__header {
        color: black;
        font-size: 1.5rem;
        text-decoration: none;
      }
    }
  }
}
</style>
