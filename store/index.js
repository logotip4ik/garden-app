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
  saveForm({ state }, type) {
    console.log('saving form: ', type)
  },
  resetForm({ state }) {
    state.name = ''
  },
}

export const strict = false
