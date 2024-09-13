<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <router-link
          to="/"
          class="text-white text-lg font-semibold"
        >
          MyApp
        </router-link>
      </div>
      <div>
        <span class="text-white" v-if="isAuthenticated && userProfile">
          Welcome, {{ userProfile.username }}!
        </span>

        <router-link
          v-if="!isAuthenticated"
          to="/login"
          class="text-white ml-4"
        >
          Login
        </router-link>

        <button
          v-if="isAuthenticated"
          class="text-white ml-4"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      logoutInProgress: false,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'userProfile']),
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      try {
        if (!this.isAuthenticated || this.logoutInProgress) return;

        this.logoutInProgress = true; 
        await this.logout(); 
        this.$router.push('/login');
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        this.logoutInProgress = false;
      }
    },
  },
};
</script>
