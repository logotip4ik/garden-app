<template>
  <li class="item" @click.self="$emit('click', $event)">
    <h2 class="item__header" @click.self="$emit('click', $event)">
      {{ decodeURI(item.name) }}
    </h2>
    <button class="item__delete" @click="promptDelete">
      <span class="material-icons">delete</span>
    </button>
  </li>
</template>

<script>
import { fire } from '~/hooks/useFirebase'

export default {
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    group: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    async deletePlant() {
      const plants = this.$store.state.currGroup.plants.filter(
        (item) => item.id !== this.item.id
      )

      const plantPath = `plants/${this.item.id}`

      await fire.firestore().doc(plantPath).delete()
      await fire
        .firestore()
        .collection('groups')
        .doc(this.$store.state.currGroup.id)
        .set({ plants }, { merge: true })

      this.$store.commit('update', [
        'currGroup',
        { ...this.$store.state.currGroup, plants },
      ])
    },
    async deleteGroup() {
      for (let i = 0; i < this.item.plants.length; i++) {
        const plant = this.item.plants[i]
        await plant.delete()
      }

      const groupPath = `groups/${this.item.id}`
      const yearPath = `years/${fire.auth().currentUser.uid}`

      const groups = this.$store.state.years[this.$store.state.currYear].filter(
        (item) => item.id !== this.item.id
      )

      await fire.firestore().doc(groupPath).delete()
      await fire
        .firestore()
        .doc(yearPath)
        .set({ [this.$store.state.currYear]: groups }, { merge: true })
      this.$store.commit('update', [
        'years',
        { ...this.$store.state.years, [this.$store.state.currYear]: groups },
      ])
    },
    async promptDelete() {
      const { remove } = await this.$store.dispatch(
        'showDialog',
        `Ви впевнені що хочете видалити: "${decodeURI(this.item.name)}" ?`
      )
      if (!remove) return
      this.$nuxt.$loading.start()

      if (!this.group) await this.deletePlant()
      if (this.group) await this.deleteGroup()

      this.$store.dispatch('showSnack', [
        `Видалено: ${decodeURI(this.item.name)}`,
      ])
      this.$nuxt.refresh()
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  border-radius: 0;
  width: 100%;
  padding: 1rem 1.5rem;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 200ms ease-out;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
  &__delete {
    $button-size: 33px;
    width: $button-size;
    height: $button-size;
    border-radius: 50%;
    border: none;
    background-color: transparent;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 200ms ease-out, color 200ms ease-out;

    &:hover {
      background-color: rgba($color: #000000, $alpha: 0.2);
      color: rgba($color: red, $alpha: 0.8);
    }
  }
}
</style>
