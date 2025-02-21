<template>
  <ModalWrapper>
    <Form @submit="submitForm" class="expense-form">
      <h2>Nova Solicitação de Reembolso</h2>
      <BaseInput
        label="Valor (R$):"
        type="number"
        v-model="form.amount"
        required
      />
      <BaseInput
        label="Data:"
        type="date"
        v-model="form.date"
        required
      />
      <BaseTextarea
        label="Descrição:"
        v-model="form.description"
        required
      />
      <BaseSelect label="Projeto:" v-model="selectedProjectId" required>
        <option disabled value="">Selecione um projeto</option>
        <option
          v-for="project in availableProjects"
          :key="project.id"
          :value="project.id"
        >
          {{ project.name }}
        </option>
      </BaseSelect>
      <BaseSelect
        v-if="availableTags.length > 0"
        label="Tags:"
        v-model="form.projectTagId"
      >
        <option
          v-for="tag in availableTags"
          :key="tag.id"
          :value="tag.id"
        >
          {{ tag.tag }}
        </option>
      </BaseSelect>
      <FileUpload
        label="Recibo:"
        required
        @file-selected="file => form.receipt = file"
      />
      <FileUpload
        label="Cupom Fiscal"
        required
        @file-selected="file => form.fiscalCoupon = file"
      />
      <div class="buttons">
        <button type="submit" :disabled="isSubmitting">Enviar Solicitação</button>
        <button type="button" @click="$emit('cancel')">Cancelar</button>
      </div>
    </Form>
  </ModalWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, PropType } from 'vue';
import ModalWrapper from '@/components/ModalWrapper.vue';
import Form from '@/components/form/Form.vue';
import BaseInput from '@/components/form/BaseInput.vue';
import BaseTextarea from '@/components/form/BaseTextarea.vue';
import BaseSelect from '@/components/form/BaseSelect.vue';
import FileUpload from '@/components/form/FileUpload.vue';
import type { Project, ProjectTag } from '@/types';

export default defineComponent({
  name: 'ExpenseForm',
  components: {
    ModalWrapper,
    Form,
    BaseInput,
    BaseTextarea,
    BaseSelect,
    FileUpload,
  },
  emits: ['expense-created', 'cancel'],
  props: {
    availableProjects: {
      type: Array as PropType<Project[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const form = reactive({
      amount: 0,
      date: '',
      description: '',
      projectTagId: '',
      projectId: '',
      receipt: null as File | null,
      fiscalCoupon: null as File | null,
      cardReceipt: null as File | null,
    });
    const selectedProjectId = ref<string>('');
    const availableTags = ref<ProjectTag[]>([]);

    watch(selectedProjectId, (newId) => {
      form.projectId = newId;
      const project = props.availableProjects.find(p => p.id === Number(newId));
      availableTags.value = project ? project.project_tags : [];
    });

    const isSubmitting = ref(false);

    async function submitForm() {
      isSubmitting.value = true;
      const formData = new FormData();
      formData.append('expense[amount]', form.amount.toString());
      formData.append('expense[date]', form.date);
      formData.append('expense[description]', form.description);
      formData.append('expense[project_tag_id]', form.projectTagId);
      formData.append('expense[project_id]', form.projectId);
      if (form.receipt) {
        formData.append('expense[receipt]', form.receipt);
      }
      if (form.fiscalCoupon) {
        formData.append('expense[fiscal_coupon]', form.fiscalCoupon);
      }
      if (form.cardReceipt) {
        formData.append('expense[card_receipt]', form.cardReceipt);
      }
      try {
        emit('expense-created', formData);
      } catch (error) {
        console.error('Erro ao criar solicitação:', error);
      } finally {
        isSubmitting.value = false;
      }
    }

    return {
      form,
      selectedProjectId,
      availableTags,
      isSubmitting,
      submitForm,
    };
  },
});
</script>

<style scoped>
.expense-form {
  width: 100%;
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
}

.expense-form h2 {
  color: #2c3e50;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
}

.buttons {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
}

.buttons button {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  margin: 0 0.25rem;
}

.buttons button[type="submit"] {
  background-color: #3498db;
  color: #fff;
}

.buttons button[type="submit"]:hover:not(:disabled) {
  background-color: #2980b9;
}

.buttons button[type="button"] {
  background-color: #95a5a6;
  color: #fff;
}

.buttons button[type="button"]:hover {
  background-color: #7f8c8d;
}
</style>
