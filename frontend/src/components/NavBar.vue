<template>
  <nav class="navbar navbar-expand-md custom-nav">
    <div class="container">
      <RouterLink class="navbar-brand" :to="{ name: 'home' }">{{ brandName }}</RouterLink>
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: 'home' }">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: 'books' }">Books</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: 'dashboard' }" v-if="isLoggedIn">Dashboard</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: 'login' }" v-if="!isLoggedIn">Login</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: 'register' }" v-if="!isLoggedIn">Register</RouterLink>
        </li>
        <li class="nav-item">
          <button class="nav-link" @click="logoutUser" v-if="isLoggedIn">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/authStore.js';
import { mapState, mapActions } from 'pinia';
export default {
  name: "NavBar",
  data() {
    return {
      brandName: "Bostorek"
    }
  },
  computed:{
    ...mapState(useAuthStore, ['isLoggedIn']),
  },
  methods:{
    ...mapActions(useAuthStore, ['logout']),
    logoutUser(){
      this.logout();
    }
  }
}
</script>

<style scoped>
.custom-nav {
  background-color: var(--primary-color);
  padding: 15px 0;
}

.navbar-brand {
  padding: 0;
  margin: 0;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.nav-link {
  padding: 10px 15px !important;
  color: #fff;
  text-align: center;
}

.nav-link:hover {
  color: var(--secondary-color);
}

.active-link {
  color: var(--secondary-color);
}
</style>