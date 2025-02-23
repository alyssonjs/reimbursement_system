<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/">Sistema de Reembolso</router-link>
    </div>
    <div class="navbar-content">
      <ul class="nav-items">
        <li><router-link to="/">Home</router-link></li>
        <template v-if="authStore.role === 'employee'">
          <li>
            <router-link to="/employee/expenses">Solicitações</router-link>
          </li>
        </template>
        <template v-else-if="authStore.role === 'manager'">
          <li>
            <router-link to="/manager/dashboard">Gerenciar</router-link>
          </li>
          <li>
            <router-link to="/manager/projects">Projetos</router-link>
          </li>
        </template>
      </ul>
      <button v-if="authStore.role" class="logout-btn" @click="handleLogout" title="Logout">
        <i class="fas fa-sign-out-alt"></i>
      </button>
      <button class="hamburger-btn" @click="toggleMenu" title="Menu">
        <i class="fas fa-bars"></i>
      </button>
      <div v-if="showHamburger" class="hamburger-menu">
        <router-link to="/" @click="showHamburger = false">Home</router-link>
        <template v-if="authStore.role === 'employee'">
          <router-link to="/employee/expenses" @click="showHamburger = false">Solicitações</router-link>
        </template>
        <template v-else-if="authStore.role === 'manager'">
          <router-link to="/manager/dashboard" @click="showHamburger = false">Gerenciar</router-link>
          <router-link to="/manager/projects" @click="showHamburger = false">Projetos</router-link>
        </template>
        <button v-if="authStore.role" class="logout-btn-mobile" @click="handleLogout" title="Logout">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const showHamburger = ref(false);
const authStore = useAuthStore();
const router = useRouter();

function toggleMenu() {
  showHamburger.value = !showHamburger.value;
}

function handleLogout() {
  authStore.logout();
  router.push({ name: 'Login' });
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3498db;
  padding: 1rem;
  color: #fff;
  font-family: 'Roboto', sans-serif;
}

.navbar-brand a {
  color: #fff;
  font-size: 1.5rem;
  text-decoration: none;
}

.navbar-content {
  display: flex;
  align-items: center;
  position: relative;
}

.nav-items {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-items li a {
  color: #fff;
  text-decoration: none;
}

.logout-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 1rem;
  transition: color 0.3s;
}

.logout-btn:hover {
  color: #f1c40f;
}

.hamburger-btn {
  display: none;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.8rem;
  cursor: pointer;
  margin-left: 1rem;
}

.hamburger-menu {
  position: absolute;
  top: 60px;
  right: 1rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hamburger-menu a {
  color: #3498db;
  text-decoration: none;
  padding: 0.5rem;
}

.hamburger-menu a:hover {
  background-color: #ecf0f1;
}

.logout-btn-mobile {
  background: transparent;
  border: none;
  color: #3498db;
  font-size: 1rem;
  cursor: pointer;
  text-align: left;
  padding: 0.5rem;
}

.logout-btn-mobile:hover {
  color: #2980b9;
}

@media (max-width: 600px) {
  .nav-items {
    display: none;
  }
  .hamburger-btn {
    display: block;
  }
  .logout-btn {
    display: none;
  }
}
</style>
