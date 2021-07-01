import Dexie from 'dexie'
import { v4 } from 'uuid'
import { transliterate } from 'transliteration'

export const state = () => ({
  db: {},
  groups: [],
  name: '',
})

export const mutations = {
  setDb: (state, db) => (state.db = db),
  setGroups: (state, groups) => (state.groups = groups),
  update: (state, [property, val]) => (state[property] = val),
}

export const actions = {
  initDB({ state }) {
    const db = new Dexie('garden')
    db.version(2).stores({
      groups: '&id, &name, &slug',
      plants: '&id, &name, &slug',
      date: '&id',
    })

    state.db = db
  },
  showSnack(_, [text, timeout = 5000]) {
    const snackContainer = document.createElement('div')
    snackContainer.classList.add('snackbar-container')

    const snack = document.createElement('div')
    snackContainer.appendChild(snack)
    snack.classList.add('snackbar')
    snack.textContent = text

    document.body.appendChild(snackContainer)

    setTimeout(() => snack.classList.remove('append'), timeout - 500)
    setTimeout(() => snackContainer.remove(), timeout)
    setTimeout(() => snack.classList.add('append'), 10)
  },
  async saveForm({ state, dispatch }, type) {
    if (!state.name) return
    const group = {
      id: v4(),
      name: encodeURI(state.name),
      slug: transliterate(state.name).toLowerCase(),
    }
    if (type === 'group') group.plants = []
    await state.db.table('groups').put(group)
    state.groups.unshift(group)
    state.name = ''
    dispatch('showSnack', [
      `Створено нову ${
        type === 'group' ? 'групу' : type === 'plant' ? 'рослину' : 'дату'
      }`,
    ])
    if (window.history.length > 1) return this.$router.go(-1)
    return this.$router.push({ name: 'index' })
  },
  resetForm({ state }) {
    state.name = ''
  },
}

export const strict = false
