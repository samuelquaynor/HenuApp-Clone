<template>
  <nav>
    <div class="nav-header">
      <div class="container">
        <div class="order-online">order online or call us 0248477398</div>
        <div class="advanced-buttons">
          <ul class="nav-icons">
            <li class="search">search</li>
            <li class="wishlist">wishlist</li>
            <li class="currency">USD</li>
            <li @click="logout" v-if="isLoggedIn" style="cursor: pointer">
              log out
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="navbar">
      <div class="container">
        <NuxtLink to="/" class="logo">materialmax.com</NuxtLink>
        <div class="menu-items">
          <ul>
            <li><NuxtLink to="/" class="nav-link" href="">home</NuxtLink></li>
            <li><NuxtLink to="" class="nav-link" href="">catalog</NuxtLink></li>
            <li><NuxtLink to="" class="nav-link" href="">megamenu</NuxtLink></li>
            <li><NuxtLink to="" class="nav-link" href="">sale</NuxtLink></li>
            <li><NuxtLink to="" class="nav-link" href="">blog</NuxtLink></li>
            <li><NuxtLink to="" class="nav-link" href="">contact</NuxtLink></li>
          </ul>
        </div>
        <!-- <div class="cart"><span> my cart:</span> 0 item(s)</div> -->
        <NuxtLink class="nav-link" to="/Account" v-if="!isLoggedIn">Login/Signup</NuxtLink>
      </div>
    </div>
  </nav>
</template>
<style lang="scss" scoped></style>
<script>
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapState({
      authUser: (state) => state.authUser,
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },
  methods: {
    async logout() {
      try {
        await this.$fire.auth.signOut();
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>
