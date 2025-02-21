<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'ModalWrapper',
  });
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center; /* Centralizado para telas maiores */
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-height: 90vh;
    overflow-y: auto;
  }
  
  /* Ajustes específicos para dispositivos móveis */
  @media (max-width: 600px) {
    .modal-overlay {
      align-items: flex-start;
      padding-top: 10vh;   /* 10% do topo */
      padding-bottom: 10vh; /* 10% da base */
    }
    
    .modal-content {
      width: 95%;
      max-width: 95%;
      padding: 1rem;
      border-radius: 0;
      max-height: calc(100vh - 20vh); /* 100vh menos 10% do topo e 10% da base */
    }
  }
  </style>
  