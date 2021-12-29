import { vuexfireMutations, firestoreAction } from 'vuexfire';
import state from './state';

export default {
  async nuxtServerInit({ dispatch }, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user;

      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      );

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      });
    }
  },

  bindCountDocument: firestoreAction(async function ({ bindFirestoreRef }) {
    this.$fire.firestore
      .collection('Users')
      .doc('data/' + state.authUser.uid)
      .set({ firstname: state.FirstName, lastname: state.LastName })
      .catch((error) => {
        console.log(error.message);
      });
    console.log('passed');
  }),

  async onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE');
      return;
    }
    if (authUser) {
      commit('SET_AUTH_USER', { authUser });
      this.$router.push({ path: '/' });
    }
  },

  checkVuexStore(ctx) {
    if (this.$fire.auth === null) {
      throw 'Vuex Store example not working - this.$fire.auth cannot be accessed.';
    }

    alert(
      'Success. Nuxt-fire Objects can be accessed in store actions via this.$fire___'
    );
  },
};
