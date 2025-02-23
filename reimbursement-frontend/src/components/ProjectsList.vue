<template>
  <div class="project-list">
    <h1>Projetos Disponíveis</h1>
    <button class="btn-create" @click="openProjectForm">
      Criar Novo Projeto
    </button>
    <div v-if="projectStore.loading" class="loading">
      Carregando projetos...
    </div>
    <div v-if="projectStore.error" class="error">
      {{ projectStore.error }}
    </div>
    <div class="projects-container" v-if="!projectStore.loading && !projectStore.error">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <h2>{{ project.name }}</h2>
        <p class="description">{{ project.description }}</p>
        <p class="budget">
          <strong>Orçamento:</strong> {{ formatCurrency(project.budget) }}
        </p>
        <div class="project-tags">
          <span
            v-for="tag in project.project_tags"
            :key="tag.id"
            class="tag"
          >
            {{ tag.tag }}: {{ formatCurrency(tag.allocated_budget) }}
          </span>
        </div>
      </div>
    </div>

    <ProjectForm
      v-if="showProjectForm" 
      @project-created="handleProjectCreated" 
      @cancel="closeProjectForm" 
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useProjectStore } from '@/stores/project';
import ProjectForm from '@/components/ProjectForm.vue';

const projectStore = useProjectStore();

onMounted(() => {
  projectStore.fetchProjects();
});

const projects = computed(() => projectStore.projects);

function formatCurrency(value: number) {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  return numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const showProjectForm = ref(false);
function openProjectForm() {
  showProjectForm.value = true;
}

function closeProjectForm() {
  showProjectForm.value = false;
}

async function handleProjectCreated(projectData: any) {
  await projectStore.createProject(projectData);
  closeProjectForm();
}
</script>

<style scoped>
.project-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
  background-color: #f7f9fa;
  color: #2c3e50;
}

.project-list h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #3498db;
  font-size: 2.2rem;
  font-weight: 700;
}

.btn-create {
  display: block;
  margin: 0 auto 2rem;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-create:hover:not(:disabled) {
  background-color: #2980b9;
}

.loading,
.error {
  text-align: center;
  margin-bottom: 1rem;
  padding: 1rem;
  font-size: 1rem;
}

.error {
  color: #e74c3c;
}

.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.project-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  transition: box-shadow 0.3s;
  cursor: pointer;
}

.project-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-card h2 {
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
  color: #3498db;
}

.description {
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: #555;
}

.budget {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: #2c3e50;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: #e8f0fe;
  color: #3498db;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
}
</style>
