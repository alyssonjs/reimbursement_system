<template>
  <ModalWrapper>
    <Form @submit="submitProject" class="project-form">
      <h2>Novo Projeto</h2>
      <BaseInput
        label="Nome:"
        type="text"
        v-model="project.name"
        required
      />
      <BaseTextarea
        label="Descrição:"
        v-model="project.description"
        rows="3"
      />
      <BaseInput
        label="Orçamento (R$):"
        type="text"
        v-model="formattedBudget"
        required
      />

      <ProjectTags v-model:tags="project.project_tags" />

      <ProjectSubordinates
        :subordinates="subordinates"
        v-model:subordinateIds="subordinateIds"
      />

      <div class="buttons">
        <button type="submit" class="btn-submit" :disabled="isLoading">
          Criar Projeto
        </button>
        <button type="button" class="btn-cancel" @click="cancel">
          Cancelar
        </button>
      </div>
    </Form>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue';
import ModalWrapper from '@/components/ModalWrapper.vue';
import Form from '@/components/form/Form.vue';
import BaseInput from '@/components/form/BaseInput.vue';
import BaseTextarea from '@/components/form/BaseTextarea.vue';
import ProjectTags from '@/components/ProjectTags.vue';
import ProjectSubordinates from '@/components/ProjectSubordinates.vue';
import { useSubordinateStore } from '@/stores/subordinateStore';

const emit = defineEmits(['project-created', 'cancel']);

const project = reactive({
  name: '',
  description: '',
  budget: 0,
  project_tags: [] as Array<{ tag: string; allocated_budget: number }>,
  subordinate_ids: [] as number[],
});

const isLoading = ref(false);

const subordinates = ref<Array<{ id: number; name: string; email: string }>>([]);

const subordinateIds = computed({
  get: () => project.subordinate_ids || [],
  set: (value: number[]) => {
    project.subordinate_ids = [...value];
  }
});

onMounted(async () => {
  const subordinateStore = useSubordinateStore();
  await subordinateStore.fetchSubordinates();
  subordinates.value = subordinateStore.subordinates;
});

const rawBudget = ref('');
const formattedBudget = computed({
  get() {
    if (!rawBudget.value) return '';
    const numericValue = parseFloat(rawBudget.value) / 100;
    return numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  },
  set(value: string) {
    const digits = value.replace(/\D/g, '');
    rawBudget.value = digits;
    project.budget = digits ? parseFloat(digits) / 100 : 0;
  },
});

async function submitProject() {
  isLoading.value = true;
  try {
    const projectData = {
      project: {
        name: project.name,
        description: project.description,
        budget: parseFloat(project.budget.toFixed(2)),
        project_tags_attributes: project.project_tags.map(tag => ({
          tag: tag.tag,
          allocated_budget: tag.allocated_budget,
        })),
        subordinate_ids: project.subordinate_ids,
      }
    };
    
    emit('project-created', projectData);
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
  } finally {
    isLoading.value = false;
  }
}

function cancel() {
  emit('cancel');
}
</script>

<style scoped>
.project-form {
  width: 100%;
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
}

.project-form h2 {
  text-align: center;
  color: #3498db;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.btn-submit,
.btn-cancel {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 0.5rem;
}

.btn-submit {
  background-color: #3498db;
  color: #fff;
}

.btn-submit:hover:not(:disabled) {
  background-color: #2980b9;
}

.btn-cancel {
  background-color: #95a5a6;
  color: #fff;
}

.btn-cancel:hover {
  background-color: #7f8c8d;
}

@media (max-width: 768px) {
  .modal-content {
    margin: 0 1rem;
    width: auto;
  }
}
</style>
