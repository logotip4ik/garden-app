<template>
  <ul class="plants">
    {{
      plants
    }}
  </ul>
</template>

<script>
import Dexie from 'dexie'

export default {
  async asyncData({ store, params }) {
    const db = new Dexie('garden')
    db.version(2).stores({
      groups: '&id, &name, &slug',
      plants: '&id, &name, &slug',
      date: '&id',
    })

    const group = await db.table('groups').get({ slug: params.name })

    console.log(group)

    return { plants: group.plants }
  },
}
</script>

<style></style>
