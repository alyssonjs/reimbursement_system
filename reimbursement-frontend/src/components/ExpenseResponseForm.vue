<!-- frontend/src/components/ExpenseResponseForm.vue -->
<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Responder Solicitação</h2>
      <p><strong>ID:</strong> {{ expense.id }}</p>
      <form @submit.prevent="submitResponse">
        <div>
          <label><input type="radio" value="success" v-model="response.status" required /> Aceitar</label>
          <label><input type="radio" value="rejected" v-model="response.status" /> Rejeitar</label>
        </div>
        <div>
          <label>Comentário:</label>
          <textarea v-model="response.comment" placeholder="Informe o motivo"></textarea>
        </div>
        <div class="buttons">
          <button type="submit">Enviar Resposta</button>
          <button type="button" @click="$emit('cancel')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
import type { Expense } from '@/types'

export default defineComponent({
  name: 'ExpenseResponseForm',
  props: { expense: { type: Object as PropType<Expense>, required: true } },
  emits: ['response-submitted', 'cancel'],
  setup(props, { emit }) {
    const response = reactive({ status: '' as 'success' | 'rejected' | '', comment: '' })
    function submitResponse() {
      if (!response.status) return
      emit('response-submitted', { id: props.expense.id, status: response.status, comment: response.comment })
    }
    return { response, submitResponse }
  }
})
</script>
