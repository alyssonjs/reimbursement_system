<template>
    <nav class="pagination">
      <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
        Anterior
      </button>
      <button
        v-for="page in pages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
        Próximo
      </button>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  
  export default defineComponent({
    name: 'Pagination',
    props: {
      totalItems: {
        type: Number,
        required: true,
      },
      pageSize: {
        type: Number,
        required: true,
        default: 10,
      },
      currentPage: {
        type: Number,
        required: true,
        default: 1,
      },
    },
    emits: ['update:currentPage'],
    setup(props, { emit }) {
      const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize));
  
      // Cria um array com os números das páginas
      const pages = computed(() => {
        const arr: number[] = [];
        for (let i = 1; i <= totalPages.value; i++) {
          arr.push(i);
        }
        return arr;
      });
  
      function goToPage(page: number) {
        if (page >= 1 && page <= totalPages.value) {
          emit('update:currentPage', page);
        }
      }
  
      return {
        totalPages,
        pages,
        goToPage,
      };
    },
  });
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .pagination button {
    padding: 0.5rem 0.75rem;
    border: none;
    background-color: #3498db;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .pagination button:hover {
    background-color: #2980b9;
  }
  
  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .pagination button.active {
    background-color: #2c3e50;
  }
  </style>
  