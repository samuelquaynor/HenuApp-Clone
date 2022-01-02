<template>
  <div class="main_content container mt-16">
    <div class="template_customer template_customer__account">
      <div class="">
        <h1 class="page_heading">
          Welcome, {{ firstName + " " + lastName }}
          <a class="link_logout" href="/account/logout">Log out</a>
        </h1>

        <h2>
          From your "My Account" page you have the ability to view a snapshot of
          your recent account activity and update your account information.
          Select a link below to view or edit information.
        </h2>

        <div class="account_section__wrapper">
          <div class="account_section account_section__info">
            <h4>Account information</h4>

            <table class="account_table account_table__info">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td class="cell_right">{{ firstName + " " + lastName }}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td class="cell_right">{{ authUser.email }}</td>
                </tr>
                <tr>
                  <td>Orders</td>
                  <td class="cell_right">0</td>
                </tr>
                <tr>
                  <td>Total spent</td>
                  <td class="cell_right">
                    <span class="money" data-currency-usd="$0.00">$0.00</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="account_section account_section__default">
            <h4>
              Default address<a class="link_edit" href="/account/addresses"
                >Edit</a
              >
            </h4>

            <p class="address_item address_item__none">
              You have not set a default address
            </p>

            <p class="address_item address_item__edit">
              <a href="/account/addresses">Manage addresses (0)</a>
            </p>
          </div>
        </div>

        <div class="account_section account_orders">
          <h4>Orders</h4>

          <p class="note">You haven't placed any orders yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.template_customer .page_heading a {
  font-size: 12px;
  line-height: 1em;
  text-transform: uppercase;
}

.template_customer__account h2 {
  margin: 30px 0 0 0;
  font-size: 17px;
}

.account_table td {
  padding: 4px 0;
}

.account_section {
  overflow: hidden;
  margin: 30px 0 0 0;
  padding: 30px;
  border: 1px solid #f0f0f0;
  border-top: 2px solid #000;
}

.account_section__wrapper .account_section {
  width: 50%;
  float: left;
  margin-left: 15px;
  margin-right: 15px;
}

.account_table {
  width: 100%;
  margin: 15px 0 0 0;
}

.account_table .cell_right {
  text-align: right;
}

.address_item__none {
  margin: 20px 0 0 0;
  font-size: 14px;
}
.address_item__edit {
  font-size: 14px;
}

.address_item {
  margin: 16px 0 0 0;
}
</style>
<script>
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';
export default Vue.extend({
  computed: {
    ...mapState({
      authUser: (state) => state.authUser,
      firstName: (state) => state.firstName,
      lastName: (state) => state.lastName
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
    async readFromFirestore() {
      const messageRef = this.$fire.firestore
        .collection('message')
        .doc('message');
      try {
        const messageDoc = await messageRef.get();
        alert(messageDoc.data().message);
      } catch (e) {
        alert(e);
        return;
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
