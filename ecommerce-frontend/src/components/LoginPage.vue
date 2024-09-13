<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center text-gray-700 mb-6">
        Login
      </h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label
            class="block text-gray-600 mb-2"
            for="username"
          >
            Username
          </label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          >
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-600 mb-2"
            for="password"
          >
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          >
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition-colors"
        >
          Login
        </button>

        <!-- Button to Registration Page -->
        <div class="mt-4 text-center">
          <router-link
            to="/register"
            class="text-blue-500 hover:text-blue-700 underline"
          >
            Don't have an account? Register here
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password,
        });

        this.$router.push('/products');
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed, please check your credentials');
      }
    },
  },
};

</script>
