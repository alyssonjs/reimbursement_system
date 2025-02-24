<template>
    <section class="section">
      <h3>Tags do Projeto</h3>
      <div v-for="(tag, index) in tagsComputed" :key="index">
        <ProjectTagItem
          :tag="tag"
          @update="updateTag(index, $event)"
          @remove="removeTag(index)"
        />
      </div>
      <button type="button" class="btn-add" @click="addTag">
        Add Tag
      </button>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import ProjectTagItem from './ProjectTagItem.vue'
  
  const props = defineProps<{
    tags: Array<{ tag: string; allocated_budget: number }>
  }>()
  
  const emit = defineEmits(['update:tags'])
  
  const tagsComputed = ref([...props.tags])
  
  watch(tagsComputed, (newTags) => {
    emit('update:tags', newTags)
  }, { deep: true })
  
  function updateTag(index: number, updatedTag: { tag: string; allocated_budget: number }) {
    tagsComputed.value[index] = updatedTag;
  }
  
  function addTag() {
    tagsComputed.value.push({ tag: '', allocated_budget: 0 })
  }
  
  function removeTag(index: number) {
    tagsComputed.value.splice(index, 1)
  }
  </script>
  
  <style scoped>
  .section {
    margin-bottom: 1.5rem;
  }
  
  .btn-add {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-weight: bold;
  }
  
  .btn-add:hover {
    background-color: #2980b9;
  }
  </style>
  