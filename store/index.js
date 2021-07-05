import { transliterate } from 'transliteration'
import { fire } from '~/hooks/useFirebase'

export const state = () => ({
  db: {},
  groups: [],
  years: {},
  currYear: {},
  currPlant: {},
  currGroup: {},
  name: '',
  plantType: 'derevo',
  authenticated: false,
  derevoColumnNames: [
    'Мишече вушко',
    'Формування суцвіть',
    'Рожевий бутон',
    'Цвітіння',
    'Кінець цвітіння',
    'Ліщина',
    'Волоський горіх',
    'Формування і дозрівання плодів',
  ],
  vinogradColumnNames: [
    'Мишече вушко',
    'Формування суцвіть',
    'Рожевий бутон',
    'Цвітіння',
    'Кінець цвітіння',
    'Ліщина',
    'Волоський горіх',
    'Формування і дозрівання плодів',
  ],
})

export const mutations = {
  setGroups: (state, groups) => (state.groups = groups),
  update: (state, [property, val]) => (state[property] = val),
}

export const actions = {
  showDialog(_, text) {
    return new Promise((resolve, reject) => {
      const dialogContainer = document.createElement('div')
      dialogContainer.classList.add('dialog-container')

      const dialog = document.createElement('div')
      dialogContainer.appendChild(dialog)
      dialog.classList.add('dialog')

      const dialogHeader = document.createElement('h2')
      dialog.appendChild(dialogHeader)
      dialogHeader.textContent = text

      const res = (remove, ev) => {
        resolve({ remove, ev })
        dialogContainer.classList.remove('append')
        dialog.classList.remove('append')
        setTimeout(() => dialogContainer.remove(), 500)
      }

      const dialogDelete = document.createElement('button')
      dialog.appendChild(dialogDelete)
      dialogDelete.textContent = 'Видалити'
      dialogDelete.onclick = (ev) => res(true, ev)

      const dialogCancel = document.createElement('button')
      dialog.appendChild(dialogCancel)
      dialogCancel.textContent = 'Скасувати'
      dialogCancel.onclick = (ev) => res(false, ev)

      document.body.appendChild(dialogContainer)
      setTimeout(() => {
        dialog.classList.add('append')
        dialogContainer.classList.add('append')
      }, 10)
    })
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
  async createGroup({ state }) {
    const group = {
      belongs: fire.auth().currentUser.uid,
      name: encodeURI(state.name.trim()),
      slug: transliterate(state.name.trim()).toLowerCase(),
      plants: [],
    }
    await fire.firestore().collection('groups').add(group)
  },
  async createPlant({ state }) {
    const plant = {
      name: encodeURI(state.name.trim()),
      slug: transliterate(state.name.trim()).toLowerCase(),
      dates: {},
      belongs: fire.auth().currentUser.uid,
      type: state.plantType,
    }
    state[`${state.plantType}ColumnNames`].forEach(
      (name) =>
        (plant.dates[transliterate(name).toLowerCase()] = {
          time: null,
          notes: '',
        })
    )
    const createdPlant = await fire.firestore().collection('plants').add(plant)
    await fire
      .firestore()
      .collection('groups')
      .doc(state.currGroup.id)
      .set(
        { plants: [...state.currGroup.plants, createdPlant] },
        { merge: true }
      )
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
