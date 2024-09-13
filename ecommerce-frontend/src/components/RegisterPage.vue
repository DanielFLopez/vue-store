<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center text-gray-700 mb-6">
        Register
      </h2>
      <form @submit.prevent="register">
        <!-- Username Input -->
        <div class="mb-4">
          <label
            class="block text-gray-600 mb-2"
            for="username"
          >Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            autocomplete="username"
          >
        </div>

        <!-- Email Input -->
        <div class="mb-4">
          <label
            class="block text-gray-600 mb-2"
            for="email"
          >Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            autocomplete="email"
          >
        </div>

        <p
          v-if="emailError"
          class="text-red-500 text-center mb-4"
        >
          {{ emailError }}
        </p>

        <!-- Password Input -->
        <div class="mb-4">
          <label
            class="block text-gray-600 mb-2"
            for="password"
          >Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            autocomplete="new-password"
          >
        </div>

        <!-- Confirm Password Input -->
        <div class="mb-6">
          <label
            class="block text-gray-600 mb-2"
            for="confirmPassword"
          >Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
            autocomplete="new-password"
          >
        </div>

        <!-- Error Message -->
        <p
          v-if="passwordError"
          class="text-red-500 text-center mb-4"
        >
          {{ passwordError }}
        </p>

        <!-- Register Button -->
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>


<script>
import api from '@/services/api'; // Import the Axios API service

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordError: '',
      confirmPassword: '',
      errorMessage: '',
      emailError: ''
    };
  },
  watch: {
    email() {
      this.validateEmail();
    },
    password() {
      this.validatePasswords();
    },
    confirmPassword() {
      this.validatePasswords();
    }
  },
  methods: {
    validatePasswords() {
      console.log(this.password, this.confirmPassword, this.password !== this.confirmPassword)
      if (this.password !== this.confirmPassword) {
        this.passwordError = "Passwords don't match";
      } else {
        this.passwordError = ''; 
      }
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.emailError = 'Please enter a valid email address';
      } else {
        this.emailError = '';
      }
    },
    async register() {
      this.validateEmail();
      this.validatePasswords();


      console.log(this.validateEmail(), this.validatePasswords())
      
      if (this.passwordError || this.emailError) {
        return;
      }

      const payload = {
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirm: this.confirmPassword
      };

      try {
        const response = await api.post('http://localhost:8000/api/register/', payload);
        console.log(response.data);
        alert('User registered successfully');
      } catch (error) {
        console.error(error.response.data);
        alert('There was an error registering the user');
      }
    }
  },
};
</script>
