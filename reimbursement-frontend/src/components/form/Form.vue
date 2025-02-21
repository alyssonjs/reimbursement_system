<template>
    <form @submit.prevent="onSubmit" class="abstract-form">
      <slot></slot>
    </form>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits(['submit']);
  
  function onSubmit(e: Event) {
    emit('submit', e);
  }
  </script>
  
  <style scoped>
  .abstract-form {
    width: 100%;
  }
  </style>
  