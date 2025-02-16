<template>
  <div class="login-view">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Entrar</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value);
    router.push(authStore.role === 'manager' ? '/manager/dashboard' : '/employee/expenses');
  } catch (err) {
    error.value = err;
  }
};
</script>

<style scoped>
.login-view {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>