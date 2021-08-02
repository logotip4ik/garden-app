export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Садок',
    htmlAttrs: {
      lang: 'uk',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Вебсайт-щоденник для ведення записів про ваш садок',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
    ],
  },
  loading: {
    color: 'white',
    height: '3px',
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/helpers.css',
    '~/assets/css/snackbar.css',
    '~/assets/css/dialog.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/transliterate.js',
    '~/plugins/snackbar.js',
    '~/plugins/vue-phone-number.client.js',
    '~/plugins/vue-code-input.client.js',
    '~/plugins/vue-datepicker.client.js',
  ],
  server: {
    host: '0.0.0.0',
  },
  router: {
    middleware: ['auth'],
    // base: '/garden-app/',
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // 'nuxt-vite',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    // TODO: uncomment for prod
    '@nuxtjs/pwa',
    // '@nuxtjs/firebase',
    // [
    //   {
    //     config: {
    //       apiKey: 'AIzaSyB54xV2o0-3HfWpKDlXdWV-Sk-EQYRsfcE',
    //       authDomain: 'garden-app-b069d.firebaseapp.com',
    //       projectId: 'garden-app-b069d',
    //       storageBucket: 'garden-app-b069d.appspot.com',
    //       messagingSenderId: '317442427051',
    //       appId: '1:317442427051:web:8e143467826844d0e8cfee',
    //     },
    //     services: {
    //       auth: true, // Just as example. Can be any other service.
    //     },
    //   },
    // ],
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  // vite: { ssr: true },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  // firebase: {
  //   config: {
  //     apiKey: 'AIzaSyB54xV2o0-3HfWpKDlXdWV-Sk-EQYRsfcE',
  //     authDomain: 'garden-app-b069d.firebaseapp.com',
  //     projectId: 'garden-app-b069d',
  //     storageBucket: 'garden-app-b069d.appspot.com',
  //     messagingSenderId: '317442427051',
  //     appId: '1:317442427051:web:8e143467826844d0e8cfee',
  //   },
  //   services: {
  //     auth: {
  //       ssr: true,
  //     },
  //     //     // auth: {
  //     //     //   persistence: 'local', // default
  //     //     //   initialize: {
  //     //     //     onAuthStateChangedAction: 'onAuthStateChangedAction',
  //     //     //   },
  //     //     // },
  //   },
  // },
}
