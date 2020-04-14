
module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Nout - Task manager',
    // title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  /*
  ** PWA meta data
  */
  pwa: {
    meta: {
      lang: 'es',
      nativeUI: true
    },
    manifest: {
      name: 'Nout',
      background_color: '#769fd4',
      // icons: [
        // { src: 'static/icon.png', size: '512x512', type: 'image/png' }
      // ]
      // background_color: 'linear-gradient(#769fd4, #4b1688)'
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#EFEFEF' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss'
  ],
  styleResources: {
    scss: [
      '@/assets/scss/_utilities.scss'
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '@/plugins/api.ts'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    'nuxt-typed-vuex'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [
      // /typed-vuex/,
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
