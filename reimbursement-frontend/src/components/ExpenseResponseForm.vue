<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Responder Solicitação</h2>

      <div class="expense-info">
        <p><strong>Solicitante:</strong> {{ expense.user.name }}</p>
        <p><strong>Data:</strong> {{ expense.date }}</p>
        <p><strong>Valor:</strong> {{ formattedAmount }}</p>
        <p><strong>Descrição:</strong> {{ expense.description }}</p>
        <p v-if="expense.project_tag">
          <strong>Tag:</strong> {{ expense.project_tag.tag }}
          <span v-if="expense.project_tag.allocated_budget">
            - Valor Máximo: {{ expense.project_tag.allocated_budget }}
          </span>
        </p>
      </div>

      <!-- Exibição dos anexos -->
      <div class="attachments" v-if="expense.receipt_url || expense.fiscal_coupon_url">
        <h3>Anexos</h3>
        <div class="attachment-list">
          <div v-if="expense.receipt_url" class="attachment">
            <template v-if="isPdf(expense.receipt_url)">
              <a :href="expense.receipt_url" target="_blank" class="pdf-link">
                <i class="fas fa-file-pdf pdf-icon"></i>
              </a>
            </template>
            <template v-else>
              <img :src="expense.receipt_url" alt="Recibo" class="thumbnail" />
            </template>
            <p>Recibo</p>
          </div>

          <div v-if="expense.fiscal_coupon_url" class="attachment">
            <template v-if="isPdf(expense.fiscal_coupon_url)">
              <a :href="expense.fiscal_coupon_url" target="_blank" class="pdf-link">
                <i class="fas fa-file-pdf pdf-icon"></i>
              </a>
            </template>
            <template v-else>
              <img :src="expense.fiscal_coupon_url" alt="Cupom Fiscal" class="thumbnail" />
            </template>
            <p>Cupom Fiscal</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="submitResponse">
        <div v-if="expense.status === 'pending'" class="radio-group">
          <label>
            <input type="radio" value="accepted" v-model="response.status" required />
            Aceitar
          </label>
          <label>
            <input type="radio" value="rejected" v-model="response.status" />
            Rejeitar
          </label>
        </div>

        <div v-if="expense.status === 'pending'"  class="textarea-group">
          <label>Comentário:</label>
          <textarea v-model="response.comment" placeholder="Informe o motivo"></textarea>
        </div>

        <div class="buttons">
          <button v-if="expense.status === 'pending'" type="submit" class="btn-submit">Enviar Resposta</button>
          <button type="button" class="btn-cancel" @click="cancel">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import type { Expense } from '@/types'

const props = defineProps<{
  expense: Expense
}>()

const emit = defineEmits<{
  (e: 'response-submitted', payload: { id: number, status: 'accepted' | 'rejected', comment: string }): void,
  (e: 'cancel'): void
}>()

const response = reactive({ status: '' as 'accepted' | 'rejected' | '', comment: '' })

const formattedAmount = computed(() => {
  return props.expense.amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
})

function submitResponse() {
  if (!response.status) return
  emit('response-submitted', { id: props.expense.id, status: response.status, comment: response.comment })
}

function cancel() {
  emit('cancel')
}

function isPdf(url: string) {
  return url.toLowerCase().endsWith('.pdf')
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 550px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  font-family: 'Roboto', sans-serif;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-content h2 {
  text-align: center;
  color: #3498db;
  margin-bottom: 1.5rem;
}

.expense-info p {
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: #2c3e50;
}

.attachments {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.attachments h3 {
  margin-bottom: 1rem;
  color: #34495e;
  text-align: center;
}

.attachment-list {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.attachment {
  text-align: center;
}

.thumbnail {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
}

.thumbnail:hover {
  transform: scale(1.1);
}

.pdf-icon {
  font-size: 3rem;
  color: #e74c3c;
  transition: transform 0.2s ease-in-out;
}

.pdf-link:hover .pdf-icon {
  transform: scale(1.2);
}

.radio-group {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-weight: 600;
}

.textarea-group {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}

.textarea-group label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #34495e;
}

.modal-content textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.buttons button {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 0.25rem;
  transition: background-color 0.3s;
}

.btn-submit {
  background-color: #3498db;
  color: #fff;
}

.btn-submit:hover {
  background-color: #2980b9;
}

.btn-cancel {
  background-color: #95a5a6;
  color: #fff;
}

.btn-cancel:hover {
  background-color: #7f8c8d;
}
</style>
