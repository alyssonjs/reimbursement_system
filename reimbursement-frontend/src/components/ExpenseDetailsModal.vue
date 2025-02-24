<template>
    <ModalWrapper>
      <div class="expense-details-modal">
        <template v-if="!isEditing">
          <h2>Detalhes da Solicitação</h2>
          <div class="details">
            <div class="detail">
              <span class="label">Valor:</span> {{ formattedAmount }}
            </div>
            <div class="detail">
              <span class="label">Data:</span> {{ expense.date }}
            </div>
            <div class="detail">
              <span class="label">Descrição:</span> {{ expense.comment || expense.description }}
            </div>
            <div class="detail">
              <span class="label">Projeto:</span> {{ expense.project.name }}
            </div>
            <div class="detail">
              <span class="label">Tag:</span> {{ expense.project_tag.tag }}
            </div>
            <div class="detail status">
              <span class="label">Status:</span> <Chip :status="expense.status" />
            </div>
          </div>
  
          <div class="attachments" v-if="expense.receipt_url || expense.fiscal_coupon_url">
            <div v-if="expense.receipt_url" class="attachment">
              <template v-if="isPdf(expense.receipt_url)">
                <a :href="expense.receipt_url" target="_blank">
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
                <a :href="expense.fiscal_coupon_url" target="_blank">
                  <i class="fas fa-file-pdf pdf-icon"></i>
                </a>
              </template>
              <template v-else>
                <img :src="expense.fiscal_coupon_url" alt="Cupom Fiscal" class="thumbnail" />
              </template>
              <p>Cupom Fiscal</p>
            </div>
          </div>
  
          <div class="buttons">
            <button v-if="isEditable" class="btn-edit" @click="startEditing">Editar</button>
            <button class="btn-close" @click="close">Fechar</button>
          </div>    
        </template>
  
        <template v-else>
          <ExpenseForm
            :availableProjects="availableProjects"
            :expense="expense"
            @expense-updated="handleUpdated"
            @cancel="cancelEditing"
          />
        </template>
      </div>
    </ModalWrapper>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import ModalWrapper from '@/components/ModalWrapper.vue'
  import ExpenseForm from '@/components/ExpenseForm.vue'
  import Chip from '@/components/Chip.vue'
  import type { Expense, Project } from '@/types'
  
  const props = defineProps<{
    expense: Expense,
    availableProjects: Project[]
  }>()
  
  const emit = defineEmits<{
    (e: 'close'): void,
    (e: 'expense-updated', formData: FormData): void
  }>()
  
  const isEditing = ref(false)
  
  const formattedAmount = computed(() => {
    return Number(props.expense.amount).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  })
  
  const isEditable = computed(() => props.expense.status === 'pending')
  
  function startEditing() {
    if (isEditable.value) {
      isEditing.value = true
    }
  }
  
  function cancelEditing() {
    isEditing.value = false
  }
  
  function handleUpdated(formData: FormData) {
    isEditing.value = false
    emit('expense-updated', formData)
  }
  
  function close() {
    emit('close')
  }
  
  function isPdf(url: string) {
    return url.toLowerCase().endsWith('.pdf')
  }
  </script>
  
  <style scoped>
  .expense-details-modal {
    padding: 2rem;
    font-family: 'Roboto', sans-serif;
    color: #2c3e50;
    max-width: 500px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    color: #3498db;
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
  }
  
  .details {
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 6px;
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
  }
  
  .detail {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
  
  .label {
    font-weight: bold;
    color: #34495e;
  }
  
  .status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .attachments {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    justify-content: center;
  }
  
  .attachment {
    text-align: center;
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .thumbnail {
    max-width: 80px;
    max-height: 80px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .pdf-icon {
    font-size: 3rem;
    color: #e74c3c;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
  }
  
  .btn-edit,
  .btn-close {
    flex: 1;
    padding: 0.75rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: background-color 0.3s, transform 0.2s;
    margin: 0 0.5rem;
    text-align: center;
  }
  
  .btn-edit {
    background-color: #3498db;
    color: #fff;
  }
  
  .btn-edit:hover:not(:disabled) {
    background-color: #2980b9;
    transform: scale(1.05);
  }
  
  .btn-close {
    background-color: #95a5a6;
    color: #fff;
  }
  
  .btn-close:hover {
    background-color: #7f8c8d;
    transform: scale(1.05);
  }
  
  @media (max-width: 600px) {
    .expense-details-modal {
      padding: 1.5rem;
    }
  
    h2 {
      font-size: 1.3rem;
    }
  
    .btn-edit,
    .btn-close {
      font-size: 0.9rem;
      padding: 0.6rem;
    }
  }
  </style>
  