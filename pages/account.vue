<template>
  <section>
    <Navbar />
    <SignIn />
    <SignUp />
    <Footer />
  </section>
</template>
<script>
import Navbar from '../components/navbar.vue'
import Footer from '../components/footer.vue'
import SignIn from '../components/authentication/sign-in.vue'
import SignUp from '../components/authentication/sign-up.vue'
export default {
  components: { Footer, Navbar, SignIn, SignUp },
   async fetch({ app, store }) {
    if (process.browser) return
    try {
      // Binds it on server side then unbind again to avoid memory leaks on the server.
      await store.dispatch('bindCountDocument')
      store.dispatch('unbindCountDocument')
    } catch (e) {
      console.error(e)
    }
  },
  /**  Bind Vuexfire on client-side: */
  async mounted() {
    try {
      await this.$store.dispatch('bindCountDocument')
    } catch (e) {
      console.error(e)
    }
  },
}
</script>
