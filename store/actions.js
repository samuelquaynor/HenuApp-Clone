import { vuexfireMutations, firestoreAction } from 'vuexfire'

export default {
  async nuxtServerInit({ dispatch }, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      )

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      })
    }
  },
  async createUserData() {},

  bindCountDocument: firestoreAction(async function ({ bindFirestoreRef }) {
    this.$fire.firestore
      .collection('Users')
      .doc('data/userid/ ' + Math.random() * 20)
      .set({ firstname: '', lastname: '' })
      .catch((error) => {
        console.log(error.message)
      })
    console.log('passed')
  }),

  async onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    if (authUser && authUser.getIdToken) {
      try {
        const idToken = await authUser.getIdToken(true)
        console.info('idToken', idToken)
        console.log('user', authUser.uid)
      } catch (e) {
        console.error(e)
      }
    }
    commit('SET_AUTH_USER', { authUser })
  },

  checkVuexStore(ctx) {
    if (this.$fire.auth === null) {
      throw 'Vuex Store example not working - this.$fire.auth cannot be accessed.'
    }

    alert(
      'Success. Nuxt-fire Objects can be accessed in store actions via this.$fire___'
    )
  },
}
