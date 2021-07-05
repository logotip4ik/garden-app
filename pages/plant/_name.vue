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
                savePlant($transliterate(name).toLowerCase(), 'time', $event)
              "
          /></span>
        </h3>
        <details class="date-card__notes">
          <summary
            @click.self="
              resizeTextArea({ target: $refs[`textarea${idx}`][0] }, 10)
            "
          >
            Обробка
          </summary>
          <div>
            <textarea
              :ref="`textarea${idx}`"
              :value="plant.dates[$transliterate(name).toLowerCase()].notes"
              @input="resizeTextArea"
            ></textarea>
            <button
              :disabled="!hasChanges"
              @click="
                savePlant($transliterate(name).toLowerCase(), 'notes', {
                  target: $refs[`textarea${idx}`][0],
                })
              "
            >
              save
            </button>
          </div>
        </details>
      </li>
    </ul>
  </div>
</template>

<script>
import { fire } from '~/hooks/useFirebase'

export default {
  data: () => ({
    hasChanges: false,
  }),
  computed: {
    plant() {
      return this.$store.state.currPlant
    },
    columnNames() {
      return this.$store.state[`${this.plant.type}ColumnNames`]
    },
  },
  methods: {
    resizeTextArea({ target }, timeout = 0) {
      setTimeout(() => {
        target.style.height = 'auto'
        target.style.height = `${target.scrollHeight + 2}px`
        this.hasChanges = true
      }, timeout)
    },
    async savePlant(name, type, { target }) {
      const plantDates = {
        dates: {
          [name]: { ...this.plant.dates[name], [type]: target.value },
        },
      }
      const plantPath = `plants/${this.plant.id}`
      const newPlant = {
        ...this.plant,
        dates: { ...this.plant.dates, ...plantDates.dates },
      }

      await fire.firestore().doc(plantPath).set(plantDates, { merge: true })
      this.hasChanges = false

      this.$store.commit('update', ['currPlant', newPlant])
      // if (type === 'notes') this.$nuxt.refresh()
    },
  },
}
</script>

<style lang="scss" scoped>
.plant {
  padding-top: 1rem;

  &__dates {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    max-width: 98vw;
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
      margin-bottom: 1rem;
    }
    &__notes {
      cursor: pointer;

      div {
        text-align: right;

        textarea {
          resize: vertical;
          margin-bottom: 1rem;
          width: 100%;
          border: none;
          border-radius: 0;
          border-bottom: 1px solid rgba($color: #000000, $alpha: 0.5);
          padding: 0.25rem 0.1rem;
          outline: none;
          font: inherit;
          transition: border-bottom-color 200ms ease,
            border-bottom-width 200ms ease;

          &:hover {
            border-bottom-color: rgba($color: #000000, $alpha: 0.9);
          }
          &:focus {
            border-bottom-color: rgba($color: #000000, $alpha: 1);
            border-bottom-width: 2px;
          }
        }
        button {
          cursor: not-allowed;
          padding: 0.5rem 1rem;
          font: inherit;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          border: none;
          border-radius: 0.25rem;
          background-color: white;
          box-shadow: 0 0 2px 0 rgba($color: #000000, $alpha: 0.25),
            0 0 7px 0 rgba($color: #000000, $alpha: 0.1);
          transition: background-color 200ms ease-out;

          &:not(:disabled) {
            cursor: pointer;

            :hover {
              background-color: var(--secondary-color);
            }
          }
        }
      }
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
