<!-- frontend/src/components/ExpenseForm.vue -->
<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <form @submit.prevent="submitForm" class="expense-form">
        <h2>Nova Solicitação de Reembolso</h2>
        <div>
          <label>Valor (R$):</label>
          <input type="number" v-model.number="form.amount" required />
        </div>
        <div>
          <label>Data:</label>
          <input type="date" v-model="form.date" required />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea v-model="form.description" required></textarea>
        </div>
        <div>
          <label>Projeto:</label>
          <select v-model="selectedProjectId" required>
            <option disabled value="">Selecione um projeto</option>
            <option
              v-for="project in availableProjects"
              :key="project.id"
              :value="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
        <div v-if="availableTags.length > 0">
          <label>Tags:</label>
          <select v-model="form.projectTagId">
            <option
              v-for="tag in availableTags"
              :key="tag.id"
              :value="tag.id"
            >
              {{ tag.tag }}
            </option>
          </select>
        </div>
        <div>
          <label>Recibo (arquivo):</label>
          <input type="file" @change="handleFileUpload($event, 'receipt')" required />
        </div>
        <div>
          <label>Cupom Fiscal (foto):</label>
          <input type="file" @change="handleFileUpload($event, 'fiscalCoupon')" required/>
        </div>
        <div>
          <label>Recibo da Máquina de Cartão (foto):</label>
          <input type="file" @change="handleFileUpload($event, 'cardReceipt')" required/>
        </div>
        <div class="buttons">
          <button type="submit" :disabled="isSubmitting">Enviar Solicitação</button>
          <button type="button" @click="$emit('cancel')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, PropType } from 'vue';
import type { Project, ProjectTag } from '@/types'

export default defineComponent({
  name: 'ExpenseForm',
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

    function handleFileUpload(event: Event, field: 'receipt' | 'fiscalCoupon' | 'cardReceipt') {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        form[field] = target.files[0];
      }
    }

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
      handleFileUpload,
      submitForm,
      isSubmitting,
    };
  },
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
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 4px;
  width: 90%;
  max-width: 500px;
}
.expense-form {
  width: 100%;
}
.buttons {
  margin-top: 1rem;
}
.buttons button {
  margin-right: 0.5rem;
}
@media (max-width: 600px) {
  .modal-content {
    padding: 1rem;
  }
}
</style>
