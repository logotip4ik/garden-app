<template>
  <div class="group">
    <transition-group
      v-if="plants.length !== 0"
      name="item"
      tag="ul"
      class="group__plants"
    >
      <Item
        v-for="plant in plants"
        :key="plant.id"
        :item="plant"
        :group="false"
        @click="routeTo(plant)"
      ></Item>
    </transition-group>
    <div v-else class="empty">
      У вас не має жодної рослини.<br />
      Натисніть &plus; що б створити нову рослину
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ store, params }) {
    const groupSnapshot = store.state.currGroup

    const plants = []

    for (let i = 0; i < groupSnapshot.plants.length; i++) {
      const plant = groupSnapshot.plants[i]
      plants.push({ id: plant.id, ...(await plant.get()).data() })
    }

    return { plants, params }
  },
  head() {
    return {
      title: `${decodeURI(this.$store.state.currGroup.name)} | ${
        this.$route.params.year
      }`,
    }
  },
  methods: {
    routeTo(plant) {
      this.$store.commit('update', ['currPlant', plant])
      this.$router.push({
        name: 'year-group-id',
        params: {
          year: this.params.year,
          group: this.params.group,
          id: plant.id,
        },
      })
    },
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
    // max-width: 450px;
    // margin: 0 auto;
    list-style-type: none;
  }
}

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
