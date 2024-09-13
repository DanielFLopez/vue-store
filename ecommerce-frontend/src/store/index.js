import { createStore } from 'vuex';
import api from '../services/api';

const store = createStore({
    state: {
      token: localStorage.getItem('token') || null, 
      userProfile: JSON.parse(localStorage.getItem('userProfile')) || null, 
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
  
          const { access, user } = response.data;
  
          commit('SET_TOKEN', access);
          commit('SET_USER_PROFILE', user);
  
          localStorage.setItem('token', access);
          localStorage.setItem('userProfile', JSON.stringify(user));
  
          return response.data;
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },
      async logout({ commit }) {
        try {
          await api.post('/logout/');
        } catch (error) {
          console.error('Error during logout:', error);
        } finally {
          commit('CLEAR_AUTH');
          localStorage.removeItem('token');
          localStorage.removeItem('userProfile');
        }
      },
    },
    getters: {
      isAuthenticated: state => !!state.token,
      userProfile: state => state.userProfile,
    },
  });
  
  export default store;
  