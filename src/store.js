import {createStore} from 'vuex';
import {loginUser} from './services/userService';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async loginUser({commit}, user) {
      const loggedInUser = await loginUser(user.userEmail, user.password)
      commit('setUser', loggedInUser);
    },
  },
});