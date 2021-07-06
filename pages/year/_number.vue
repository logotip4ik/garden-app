<template>
  <div>
    <div v-if="groups.length === 0" class="empty">
      У вас не має жодної групи.<br />
      Натисніть &plus; що б створити нову групу рослин
    </div>
    <ul v-else class="main__list">
      <Item
        v-for="group in groups"
        :key="group.id"
        :item="group"
        @click="routeTo(group)"
      >
      </Item>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ store, params }) {
    const groupsSnapshot = store.state.years[params.number]

    const groups = []

    for (let i = 0; i < groupsSnapshot.length; i++) {
      const group = groupsSnapshot[i]
      groups.push({ id: group.id, ...(await group.get()).data() })
    }

    return { groups }
  },
  head() {
    return {
      title: `Садок | ${this.$store.state.currYear}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.groups.length !== 0
              ? `Дізнайтеся всі відомості про рослини у ${
                  this.groups.length === 1 ? 'групі' : 'групах'
                }: ${this.groups
                  .reduce((list, group) => [...list, decodeURI(group.name)], [])
                  .join(', ')}`
              : `Створіть нову групу у ${this.$store.state.currYear}`,
        },
      ],
    }
  },
  methods: {
    routeTo(group) {
      if (this.$store.state.currGroup.id !== group.id)
        this.$store.commit('update', ['currGroup', group])

      this.$router.push({
        name: 'group-name',
        params: { name: group.slug },
      })
    },
  },
}
</script>

<style></style>
