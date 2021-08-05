<template>
  <div class="main">
    <ul class="main__list">
      <li v-for="yearKey in yearsKeys" :key="yearKey" @click="routeTo(yearKey)">
        <h2>{{ yearKey }}</h2>
      </li>
    </ul>
  </div>
</template>

<script>
import { fire } from '~/hooks/useFirebase'

export default {
  async asyncData({ store }) {
    const db = fire.firestore()

    const years = {}
    let doc

    const currYear = new Date().getFullYear()
    const uid = fire.auth().currentUser.uid
    const docPath = `years/${uid}`
    doc = await db.doc(docPath).get()

    if (!doc.exists) {
      await db.doc(docPath).set({ [currYear]: [] })
      doc = await db.doc(docPath).get()
    }

    Object.assign(years, doc.data())
    if (!years[currYear]) {
      await db.doc(docPath).set({ [currYear]: [] }, { merge: true })
      doc = await db.doc(docPath).get()
      Object.assign(years, doc.data())
    }

    store.commit('update', ['years', years])
    // ? Why this isn't working in chrome ?
    // Object.keys(years).sort(Number)

    const yearsKeys = Object.keys(years).sort(
      (year1, year2) => Number(year2) - Number(year1)
    )

    return { yearsKeys }
  },
  head: {
    title: 'Садок',
  },
  methods: {
    routeTo(yearKey) {
      this.$router.push({
        name: 'year',
        params: { year: yearKey },
      })
    },
  },
}
</script>

<style lang="scss">
.main {
  &__list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    // max-width: 450px;
    margin: 0 auto;
    list-style-type: none;

    li {
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
    }
  }
}
</style>
