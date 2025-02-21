<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/">Sistema de Reembolso</router-link>
    </div>
    <div class="navbar-content">
      <template v-if="!authStore.token">
        <button class="btn-login" @click="goToLogin">Login</button>
      </template>
      <template v-else>
        <div class="user-info">
          <span class="user-name">{{ authStore.userInfos?.name || 'Usuário' }}</span>
          <span class="user-role">{{ authStore.role }}</span>
        </div>
        <button class="btn-logout" @click="handleLogout">Logout</button>
        <div class="hamburger-container">
          <button class="hamburger-btn" @click="toggleMenu">☰</button>
          <div v-if="showHamburger" class="hamburger-menu">
            <template v-if="authStore.role === 'employee'">
              <router-link to="/employee/expenses" @click="toggleMenu">Solicitações</router-link>
            </template>
            <template v-else-if="authStore.role === 'manager'">
              <router-link to="/manager/dashboard" @click="toggleMenu">Gerenciar</router-link>
            </template>
          </div>
        </div>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const showHamburger = ref(false);

function toggleMenu() {
  showHamburger.value = !showHamburger.value;
}

function handleLogout() {
  authStore.logout();
  router.push({ name: 'Login' });
}

function goToLogin() {
  router.push({ name: 'Login' });
}
</script>


<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #42b983;
  padding: 1rem;
  color: #fff;
}

.navbar-brand a {
  color: #fff;
  font-size: 1.5rem;
  text-decoration: none;
}

.navbar-content {
  display: flex;
  align-items: center;
}

.btn-login,
.btn-logout {
  background-color: #fff;
  color: #42b983;
  border: none;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  cursor: pointer;
  border-radius: 4px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 1rem;
}

.user-name,
.user-role {
  font-size: 0.9rem;
}

.hamburger-container {
  position: relative;
}

.hamburger-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
}

.hamburger-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.hamburger-menu a {
  color: #42b983;
  text-decoration: none;
  padding: 0.3rem 0;
}

.hamburger-menu a:hover {
  text-decoration: underline;
}
</style>
