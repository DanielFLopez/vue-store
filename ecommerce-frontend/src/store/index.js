import { createStore } from 'vuex';
import api from '../services/api';

export default createStore({
  state: {
    token: null,
    userProfile: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER_PROFILE(state, userProfile) {
      state.userProfile = userProfile;
    },
    CLEAR_AUTH(state) {
      state.token = null;
      state.userProfile = null;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.post('/api-token/', {
          username: credentials.username,
          password: credentials.password,
        });

        console.log(response, "login response")
        
        const { access, user } = response.data;
        
        commit('SET_TOKEN', access);
        commit('SET_USER_PROFILE', user);

        return response.data;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    async logout({ commit }) {
        try {
            await api.post('logout/');
            commit('CLEAR_AUTH');
            this.$router.push('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    },
  }, 
  getters: {
    isAuthenticated: state => !!state.token,
    userProfile: state => state.userProfile,
  },
});
