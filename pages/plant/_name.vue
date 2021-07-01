<template>
  <div class="plant">
    <ul class="plant__dates">
      <li v-for="(name, idx) in columnName" :key="idx" class="date-card">
        <h3 class="date-card__header">
          {{ name }} - {{ new Date().toLocaleDateString() }}
          <details>
            <summary>Обробка</summary>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              unde?
            </p>
          </details>
        </h3>
      </li>
    </ul>
    <!-- <table class="plant__table">
      <tr v-for="(name, idx) in columnName" :key="idx">
        <td class="name">{{ name }}</td>
        <td class="date">{{ new Date().toLocaleDateString() }}</td>
        <td class="notes">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet,
          maiores.
        </td>
      </tr>
    </table> -->
  </div>
</template>

<script>
import useDB from '~/hooks/useDB'

export default {
  async asyncData({ params }) {
    const db = useDB()

    const plant = await db.table('plants').get({ slug: params.name })
    const dates = await db.table('dates').where({ plant: plant.slug }).toArray()

    return { plant, dates }
  },
  data: () => ({
    columnName: [
      'Мишече вушко',
      'Формування суцвіть',
      'Рожевий бутон',
      'Цвітіння',
      'Кінець цвітіння',
      'Ліщина',
      'Волоський горіх',
      'Формування і дозрівання плодів',
    ],
  }),
}
</script>

<style lang="scss" scoped>
.plant {
  &__header {
    padding: 1rem;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.5);
  }
  &__dates {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    max-width: 1050px;
    margin: 0 auto;
    width: 100%;
    padding: 0.75rem;
    list-style-type: none;
  }
  .date-card {
    width: 100%;
    box-shadow: 0 0 2px 0 rgba($color: #000000, $alpha: 0.25),
      0 0 10px 0 rgba($color: #000000, $alpha: 0.1);
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
  }
  &__table {
    $border-color: rgba(
      $color: #000000,
      $alpha: 0.25,
    );
    border-collapse: collapse;
    border: 1px solid $border-color;
    th,
    td {
      border: 1px solid $border-color;
    }

    .name {
      max-width: fit-content;
    }
  }
}
</style>
