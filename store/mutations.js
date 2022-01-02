import { vuexfireMutations } from 'vuexfire';

import initialState from './state';

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
};
