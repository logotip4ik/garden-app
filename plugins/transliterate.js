import Vue from 'vue'
import { transliterate } from 'transliteration'

Vue.use({
  install(Vue) {
    Vue.prototype.$transliterate = transliterate
  },
})
