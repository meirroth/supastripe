// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // https://supabase.nuxtjs.org/
    '@nuxtjs/supabase',
    // https://ui.nuxt.com/
    '@nuxt/ui',
    // https://eslint.nuxt.com/packages/module
    '@nuxt/eslint',
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/account'],
    },
  },
  runtimeConfig: {
    private: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    },
    public: {
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    },
  },
})
