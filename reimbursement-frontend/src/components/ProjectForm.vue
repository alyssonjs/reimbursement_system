<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Novo Projeto</h2>
      <form @submit.prevent="submitProject">
        <div>
          <label>Nome:</label>
          <input type="text" v-model="project.name" required />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea v-model="project.description"></textarea>
        </div>
        <div>
          <label>Orçamento (R$):</label>
          <input type="number" v-model.number="project.budget" required />
        </div>
        <div>
          <h3>Tags do Projeto</h3>
          <div
            v-for="(tag, index) in project.project_tags"
            :key="index"
            class="tag-field"
          >
            <input type="text" v-model="tag.tag" placeholder="Tag" required />
            <input
              type="number"
              v-model.number="tag.allocated_budget"
              placeholder="Valor Máximo"
              required
            />
            <button type="button" @click="removeTag(index)">Remover</button>
          </div>
          <button type="button" @click="addTag">Adicionar Tag</button>
        </div>
        <div>
          <h3>Associar Subordinados</h3>
          <div v-for="user in subordinates" :key="user.id">
            <label>
              <input
                type="checkbox"
                :value="user.id"
                v-model="project.subordinate_ids"
              />
              {{ user.name }}
            </label>
          </div>
        </div>
        <div class="buttons">
          <button type="submit" :disabled="isLoading">Criar Projeto</button>
          <button type="button" @click="cancel">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useProjectStore } from '../stores/project';

export default defineComponent({
  name: 'ProjectForm',
  emits: ['project-created', 'cancel'],
  setup(_, { emit }) {
    const subordinates = [
      { id: 101, name: 'João Silva' },
      { id: 102, name: 'Maria Souza' },
    ];

    const project = reactive({
      name: '',
      description: '',
      budget: 0,
      project_tags: [] as Array<{ tag: string; allocated_budget: number }>,
      subordinate_ids: [] as number[],
    });

    const projectStore = useProjectStore();
    const isLoading = ref(false);

    function addTag() {
      project.project_tags.push({ tag: '', allocated_budget: 0 });
    }

    function removeTag(index: number) {
      project.project_tags.splice(index, 1);
    }

    async function submitProject() {
      isLoading.value = true;
      try {
        const projectData = {
          name: project.name,
          description: project.description,
          budget: project.budget,
          project_tags: project.project_tags.map(tag => ({
            id: 0,
            tag: tag.tag,
            allocated_budget: tag.allocated_budget
          })),
          subordinate_ids: project.subordinate_ids,
        };

        await projectStore.createProject(projectData);
        emit('project-created', project);
      } catch (error) {
        console.error('Erro ao criar projeto:', error);
      } finally {
        isLoading.value = false;
      }
    }

    function cancel() {
      emit('cancel');
    }

    return {
      project,
      subordinates,
      addTag,
      removeTag,
      submitProject,
      cancel,
      isLoading,
    };
  },
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 4px;
  width: 90%;
  max-width: 500px;
}
.tag-field {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.buttons {
  margin-top: 1rem;
}
.buttons button {
  margin-right: 0.5rem;
}
</style>
