import { vuexfireMutations } from 'vuexfire';

import initialState from './state';
import * as firebase from '@nuxtjs/firebase';

export default {
  ...vuexfireMutations,
  RESET_STORE: (state) => {
    Object.assign(state, initialState());
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
    };
  },

  UPDATE_FIRSTNAME: (state, firstName) => {
    state.firstName = firstName;
  },

  UPDATE_LASTNAME: (state, lastName) => {
    state.lastName = lastName;
  },

  createUserData: (state) => {
    this.$fire.firestore
      .collection('Users')
      .doc('data/' + state.authUser.uid)
      .set({ firstname: state.FirstName, lastname: state.LastName })
      .catch((error) => {
        console.log(error.message);
      });
  },
};
