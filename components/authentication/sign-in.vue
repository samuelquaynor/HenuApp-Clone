<template>
  <div class="template_customer template_customer__login mb-5 mt-5">
    <div class="container">
      <h1 class="page_heading">Account</h1>

      <div id="account_section__wrapper" class="account_section__wrapper">
        <div class="account_section account_section__welcome">
          <h4>New here?</h4>

          <p class="note">Registration is free and easy!</p>

          <ul>
            <li>Faster checkout</li>
            <li>Save multiple shipping addresses</li>
            <li>View and track orders and more</li>
          </ul>

          <a id="account_register__link" class="btn" href="#"
            >Create an account</a
          >
        </div>

        <div class="account_section account_section__login">
          <input type="hidden" name="form_type" value="customer_login" /><input
            type="hidden"
            name="utf8"
            value="✓"
          />
          <h4>Already registered?</h4>

          <div class="form-group">
            <label for="customer_email">Email address</label>
            <input
              type="email"
              value=""
              name="customer[email]"
              id="customer_email"
              v-model="formData.email"
            />
            <p class="alert-inline" style="display: none"></p>
          </div>

          <div class="form-group">
            <label for="customer_password">Password</label>
            <input
              type="password"
              value=""
              name="customer[password]"
              id="customer_password"
              v-model="formData.password"
            />
            <p class="alert-inline" style="display: none"></p>
          </div>

          <div class="form-group">
            <button class="btn" @click="signInUser">Sign in</button>
            <a id="account_reset__link" href="#">Forgot your password?</a>
          </div>
          <input type="hidden" name="return_url" value="/account" />
        </div>
      </div>
      <button @click="logout">signout</button>

      <div
        id="account_section__reset"
        class="account_section account_section__hidden hidden"
      >
        <h4>
          Reset Password
          <a class="link_close account_reset__cancel" href="#">Close</a>
        </h4>

        <p class="note">We will send you an email to reset your password</p>

        <form method="post" action="/account/recover" accept-charset="UTF-8">
          <input
            type="hidden"
            name="form_type"
            value="recover_customer_password"
          /><input type="hidden" name="utf8" value="✓" />
          <div class="clearfix form-horizontal">
            <div class="form-group">
              <label for="email_recover" class="large col-sm-4"
                >Email Address</label
              >
              <div class="col-sm-4">
                <input type="email" id="email_recover" name="email" value="" />
              </div>
            </div>

            <div class="form-group">
              <div class="col-sm-4 col-sm-offset-4">
                <button type="submit" class="btn">Submit</button>
                <a class="account_reset__cancel" href="#">Cancel</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
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
  },
  data() {
    return {
      formData: {
        email: '',
        password: '',
        firsname: '',
      },
    };
  },
  methods: {
    async signInUser() {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        );
      } catch (e) {
        alert(e);
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
