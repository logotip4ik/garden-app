<template>
  <div class="plant">
    <ul class="plant__dates">
      <li v-for="(name, idx) in columnNames" :key="idx" class="date-card">
        <h3 class="date-card__header">
          <span>{{ name }}</span>
          <span>
            <input
              type="date"
              :value="plant.dates[$transliterate(name).toLowerCase()].time"
              class="no-input"
              @input="
                savePlant($transliterate(name).toLowerCase(), 'time', $event),
                  resizeTextArea($event)
              "
          /></span>
        </h3>
        <details>
          <summary>Обробка</summary>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi,
            unde?
          </p>
        </details>
      </li>
    </ul>
  </div>
</template>

<script>
import useDB from '~/hooks/useDB'

export default {
  async asyncData({ params, store }) {
    const db = useDB()

    const plant = await db.table('plants').get({ slug: params.name })
    const dates = await db.table('dates').where({ plant: plant.slug }).toArray()

    return { plant, dates, columnNames: store.state.columnNames }
  },
  mounted() {
    // for (let i = 0; i < this.columnNames.length; i++) {
    //   // console.log(this.$refs[`textarea${i}`][0])
    //   this.resizeTextArea({ target: this.$refs[`textarea${i}`][0] })
    // }
  },
  methods: {
    resizeTextArea({ target }) {
      target.style.height = 'auto'
      target.style.height = target.scrollHeight + 'px'
    },
    savePlant(name, type, ev) {
      const db = useDB()

      const newPlant = {
        ...this.plant,
        dates: {
          ...this.plant.dates,
          [name]: { ...this.plant.dates[name], [type]: ev.target.value },
        },
      }

      db.table('plants').put(newPlant)
    },
  },
}
</script>

<style lang="scss" scoped>
.plant {
  padding-top: 1rem;
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

    &__header {
      display: flex;
      gap: 0.5rem;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
  .no-input {
    appearance: none;
    border-radius: 0;
    border: none;
    font: inherit;
    font-size: 1.1rem;
    font-weight: 600;
    background-color: transparent;
  }
}
</style>
