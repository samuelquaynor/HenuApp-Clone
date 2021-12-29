<template>
  <section>
    <div
      id="account_section__register"
      class="account_section account_section__register account_section__hidden"
    >
      <h4>
        Create an account
        <a class="link_close account_register__close" href="#">Close</a>
      </h4>

      <div class="form-horizontal">
        <input type="hidden" name="form_type" value="create_customer" /><input
          type="hidden"
          name="utf8"
          value="✓"
        />
        <input
          type="hidden"
          id="password_confirmed"
          name="customer[password]"
        />

        <div class="clearfix form-group">
          <label for="first_name" class="col-sm-4">First name</label>
          <div class="col-sm-4">
            <input
              type="text"
              value=""
              name="customer[first_name]"
              id="first_name"
              v-model="firstName"
            />
            <p class="alert-inline" style="display: none"></p>
          </div>
        </div>

        <div class="clearfix form-group">
          <label for="last_name" class="col-sm-4">Last name</label>
          <div class="col-sm-4">
            <input
              type="text"
              value=""
              name="customer[last_name]"
              id="last_name"
              v-model="lastName"
            />
            <p class="alert-inline" style="display: none"></p>
          </div>
        </div>

        <div class="clearfix form-group">
          <label for="email" class="col-sm-4">Email address</label>
          <div class="col-sm-4">
            <input
              type="email"
              value=""
              name="customer[email]"
              id="email"
              v-model="formData.email"
            />
            <p class="alert-inline" style="display: none"></p>
          </div>
        </div>

        <div class="clearfix form-group">
          <label for="password_1" class="col-sm-4">Password</label>
          <div class="col-sm-4">
            <input
              type="password"
              value=""
              id="password_1"
              v-model="formData.password"
            />
            <p class="alert-inline" style="display: none"></p>
          </div>
        </div>

        <div class="clearfix form-group">
          <label for="password_2" class="col-sm-4">Confirm password</label>
          <div class="col-sm-4">
            <input type="password" value="" id="password_2" />
            <p class="alert-inline" style="display: none"></p>
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-offset-4 col-sm-4">
            <button class="btn btn-primary" @click="createUser">
              Register
            </button>
            <a class="account_register__close" href="#">Cancel</a>
          </div>
        </div>
      </div>
    </div>
    s
  </section>
</template>
<script>
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
    firstName: {
      get() {
        return this.$store.state.firstName;
      },
      set(value) {
        this.$store.commit('UPDATE_FIRSTNAME', value);
      },
    },
    lastName: {
      get() {
        return this.$store.state.lastName;
      },
      set(value) {
        this.$store.commit('UPDATE_LASTNAME', value);
      },
    },
  },
  data: () => ({
    formData: {
      email: '',
      password: '',
    },
  }),
  methods: {
    async createUser() {
      try {
        await this.$fire.auth
          .createUserWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          )
          .then(this.postdata());
      } catch (e) {
        alert(e);
      }
    },

    async postdata() { 
      try {
        let firstName = this.$store.state.firstName;
        let lastName = this.$store.state.lastName;
        this.$fire.firestore
          .collection('Users')
          .doc(this.$store.state.authUser.uid)
          .set({
            firstname: firstName,
            lastname: lastName,
          })
          .catch((error) => {
            console.log(error.message);
          });
      } catch (e) {
        console.log(e);
      }
    },

    async logout() {
      try {
        await this.$fire.auth.signOut();
      } catch (e) {
        alert(e);
      }
    },
  },
});
</script>
