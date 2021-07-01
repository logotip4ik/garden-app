import Vue from 'vue'

function createSnack(text, timeout = 3000) {
  const snack = document.createElement('div')
  snack.classList.add('snackbar')
  snack.textContent = text
  document.body.appendChild(snack)
  setTimeout(() => snack.classList.remove('append'), 500)
  setTimeout(() => snack.classList.add('disappear'), timeout - 500)
  setTimeout(() => snack.remove(), timeout)
}

Vue.use({
  install(Vue) {
    Vue.prototype.$showSnack = createSnack
  },
})
