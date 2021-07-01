import Dexie from 'dexie'

export default () => {
  const db = new Dexie('garden')
  db.version(6).stores({
    groups: '&id, &name, &slug',
    plants: '&id, &name, &slug, group',
    dates: '&id, plant',
  })

  return db
}
