<template>
  <div class="main">
    <transition name="fade" mode="out-in">
      <div v-if="groups.length === 0" class="empty">
        У вас не має жодної групи.<br />
        Натисніть &plus; що б створити нову групу рослин
      </div>
      <ul v-else class="main__list">
        <Item
          v-for="group in groups"
          :key="group.id"
          :item="group"
          @click="
            () =>
              $router.push({
                name: 'group-name',
                params: { name: group.slug },
              })
          "
        >
        </Item>
      </ul>
    </transition>
  </div>
</template>

<script>
import { fire } from '~/hooks/useFirebase'

export default {
  async asyncData() {
    const db = fire.firestore()

    const groups = []

    const uid = fire.auth().currentUser.uid
    const querySnapshot = await db
      .collection('groups')
      .where('belongs', '==', uid)
      .get()
    querySnapshot.forEach((doc) => groups.push({ id: doc.id, ...doc.data() }))

    return { groups }
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
  }
}
</style>
