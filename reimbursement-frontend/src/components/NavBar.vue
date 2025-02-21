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
  background-color: #3498db; /* Cor primária da identidade visual */
  padding: 1rem;
  color: #fff;
  font-family: 'Roboto', sans-serif;
}

.navbar-brand a {
  color: #fff;
  font-size: 1.8rem;
  text-decoration: none;
  font-weight: bold;
}

.navbar-content {
  display: flex;
  align-items: center;
}

/* Botões de Login e Logout */
.btn-login,
.btn-logout {
  background-color: #fff;
  color: #3498db;
  border: none;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;
}

.btn-login:hover,
.btn-logout:hover {
  background-color: #f0f0f0;
}

/* Informações do usuário */
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

/* Container do Hamburger para mobile */
.hamburger-container {
  position: relative;
}

.hamburger-btn {
  background: transparent;
  border: none;
  font-size: 1.8rem;
  color: #fff;
  cursor: pointer;
  margin-left: 1rem;
}

.hamburger-menu {
  position: absolute;
  top: 120%;
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
  color: #3498db;
  text-decoration: none;
  padding: 0.5rem 0;
  font-weight: 500;
}

.hamburger-menu a:hover {
  text-decoration: underline;
}

/* Ajustes responsivos para dispositivos móveis */
@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    padding: 0.75rem;
  }
  
  .navbar-brand {
    margin-bottom: 0.5rem;
  }
  
  .navbar-content {
    width: 100%;
    justify-content: space-between;
  }
  
  .btn-login,
  .btn-logout {
    padding: 0.4rem 0.75rem;
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }
  
  .user-info {
    margin-right: 0.5rem;
  }
  
  .hamburger-btn {
    font-size: 1.5rem;
    margin-left: 0.5rem;
  }
}
</style>
