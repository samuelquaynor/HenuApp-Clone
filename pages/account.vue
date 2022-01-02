<template>
  <section>
    <Navbar />
    <section v-if="isLoggedIn">
      <Profile />
    </section>

    <section v-else>
      <SignIn />
      <SignUp />
    </section>
    <Footer />
  </section>
</template>
<script>
import Navbar from '../components/navbar.vue';
import Footer from '../components/footer.vue';
import SignIn from '../components/authentication/sign-in.vue';
import SignUp from '../components/authentication/sign-up.vue';
import Profile from '../components/profile.vue';

import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';

export default Vue.extend({
  computed: {
    ...mapState({
      authUser: (state) => state.authUser,
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },
  components: { Footer, Navbar, SignIn, SignUp, Profile },
});
</script>
