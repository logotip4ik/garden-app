<template>
  <div>
    <div v-if="groups.length === 0" class="empty">
      У вас не має жодної групи.<br />
      Натисніть &plus; що б створити нову групу рослин
    </div>
    <transition-group v-else name="item" tag="ul" class="main__list">
      <Item
        v-for="group in groups"
        :key="group.id"
        :item="group"
        @click="routeTo(group)"
      >
      </Item>
    </transition-group>
  </div>
</template>

<script>
export default {
  async asyncData({ store, params }) {
    const groupsSnapshot = store.state.years[params.year]

    const groups = []

    for (let i = 0; i < groupsSnapshot.length; i++) {
      const group = groupsSnapshot[i]
      groups.push({ id: group.id, ...(await group.get()).data() })
    }

    return { groups, year: params.year }
  },
  head() {
    return {
      title: `Садок | ${this.year}`,
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
      this.$store.commit('update', ['currGroup', group])

      this.$router.push({
        name: 'year-group',
        params: { group: group.slug, year: this.year },
      })
    },
  },
}
</script>

<style>
.item-enter-from,
.item-leave-to {
  opacity: 0;
}
.itme-enter-active,
.item-leave-active {
  transition: opacity 200ms ease;
}
.item-leave-active {
  position: absolute;
}
.item-move {
  transition: transform 0.4s ease;
}
</style>
