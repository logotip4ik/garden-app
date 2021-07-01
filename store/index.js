import { v4 } from 'uuid'
import { transliterate } from 'transliteration'
import useDB from '~/hooks/useDB'

export const state = () => ({
  db: {},
  groups: [],
  currGroup: {},
  name: '',
})

export const mutations = {
  setDb: (state, db) => (state.db = db),
  setGroups: (state, groups) => (state.groups = groups),
  update: (state, [property, val]) => (state[property] = val),
}

export const actions = {
  initDB({ state }) {
    state.db = useDB()
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
  createGroup({ state }) {
    const group = {
      id: v4(),
      name: encodeURI(state.name.trim()),
      slug: transliterate(state.name.trim()).toLowerCase(),
    }
    state.groups.unshift(group)
    state.db.table('groups').put(group)
  },
  createPlant({ state }) {
    const plant = {
      id: v4(),
      name: encodeURI(state.name.trim()),
      slug: transliterate(state.name.trim()).toLowerCase(),
      group: state.currGroup.slug,
    }
    state.db.table('plants').put(plant)
  },
  async saveForm({ state, dispatch }, type) {
    if (!state.name) return

    if (type === 'groups') await dispatch('createGroup')
    if (type === 'plants') await dispatch('createPlant')

    state.name = ''

    dispatch('showSnack', [
      `Створено нову ${
        type === 'groups' ? 'групу' : type === 'plants' ? 'рослину' : 'дату'
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
