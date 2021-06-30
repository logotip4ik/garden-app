<template>
  <ul class="plants">
    {{
      groups
    }}
  </ul>
</template>

<script>
import Dexie from 'dexie'

export default {
  async asyncData({ store, params }) {
    const db = new Dexie('garden')
    db.version(1).stores({
      groups: '&id, &name',
      plants: '&id, &name',
      date: '&id',
    })

    const group = await db
      .table('groups')
      .where({ name: params.name })
      .toArray()

    console.log(group)

    return { plants: group }
  },
}
</script>

<style></style>
