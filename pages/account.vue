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
}
</script>
