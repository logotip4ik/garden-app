<template>
  <div class="main">
    <transition name="fade" mode="out-in">
      <div v-if="groups.length === 0" class="main__empty">
        У вас не має жодної групи.<br />
        Натисніть &plus; що б створити нову групу рослин
      </div>
      <ul v-else class="main__list">
        <li
          v-for="group in groups"
          :key="group.id"
          class="main__list__item"
          @click="
            () =>
              $router.push({
                name: 'group',
                params: { name: $transliterate(group.name).toLowerCase() },
              })
          "
        >
          <h2 class="main__list__item__header">
            {{ group.name }}
          </h2>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import Dexie from 'dexie'

export default {
  async asyncData({ store }) {
    const db = new Dexie('garden')
    db.version(1).stores({
      groups: '&id, &name',
      plants: '&id, &name',
      date: '&id',
    })

    const groups = await db.table('groups').toArray()

    store.commit('setGroups', groups)

    return { groups }
  },
}
</script>

<style lang="scss">
.main {
  &__empty {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 100%;
    max-width: 17rem;
    font-size: 1.25rem;
  }
  &__list {
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
