<template>
    <section class="section">
      <h3>Tags do Projeto</h3>
      <div v-for="(tag, index) in tagsComputed" :key="index" class="tag-field">
        <BaseInput
          label="Nome:"
          type="text"
          v-model="tag.tag"
          placeholder="Digite algo"
          required
        />
        <BaseInput
          label="Valor:"
          type="number"
          v-model.number="tag.allocated_budget"
          placeholder="Valor Máximo"
          required
        />
        <button
          type="button"
          class="btn-remove"
          @click="removeTag(index)"
          title="Remover"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <button type="button" class="btn-add" @click="addTag">
        Adicionar Tag
      </button>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import BaseInput from '@/components/form/BaseInput.vue';
  
  const props = defineProps<{
    tags: Array<{ tag: string; allocated_budget: number }>
  }>();
  
  const emit = defineEmits(['update:tags']);
  
  const tagsComputed = ref([...props.tags]);
  
  watch(tagsComputed, (newTags) => {
    emit('update:tags', newTags);
  }, { deep: true });
  
  function addTag() {
    tagsComputed.value.push({ tag: '', allocated_budget: 0 });
  }
  
  function removeTag(index: number) {
    tagsComputed.value.splice(index, 1);
  }
  </script>
  
  <style scoped>
  .section {
    margin-bottom: 1.5rem;
  }
  
  .tag-field {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    align-items: center;
  }
  
  .btn-remove {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .btn-remove:hover {
    background-color: #e74c3c33;
  }
  
  .btn-add {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-add:hover {
    background-color: #2980b9;
  }
  </style>
  