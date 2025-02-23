<template>
  <ModalWrapper>
    <Form @submit="submitForm" class="expense-form">
      <h2>{{ formTitle }}</h2>
      <div class="input-group">
        <BaseInput
          label="Valor (R$):"
          type="text"
          v-model="formattedAmount"
          required
          :class="{ 'error-input': amountTouched && !isAmountValid }"
          @blur="handleBlur"
        />
        <span v-if="amountTouched && !isAmountValid" class="error-message">
          Valor inválido. Insira somente números.
        </span>
      </div>
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
      <BaseSelect 
        label="Projeto:"
        v-model="selectedProjectId" 
        required
      >
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
        :required="!isEditMode"
        accept=".jpeg,.jpg,.pdf"
        @file-selected="validateFile($event, 'receipt')"
      />
      <FileUpload
        label="Cupom Fiscal:"
        :required="!isEditMode"
        accept=".jpeg,.jpg,.pdf"
        @file-selected="validateFile($event, 'fiscal_coupon')"
      />
      <div class="buttons">
        <button type="submit" :disabled="isSubmitting || !isAmountValid">
          {{ isEditMode ? 'Salvar Alterações' : 'Enviar Solicitação' }}
        </button>
        <button type="button" @click="cancel">Cancelar</button>
      </div>
    </Form>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch, onMounted } from 'vue'
import ModalWrapper from '@/components/ModalWrapper.vue'
import Form from '@/components/form/Form.vue'
import BaseInput from '@/components/form/BaseInput.vue'
import BaseTextarea from '@/components/form/BaseTextarea.vue'
import BaseSelect from '@/components/form/BaseSelect.vue'
import FileUpload from '@/components/form/FileUpload.vue'
import type { Expense, Project, ProjectTag } from '@/types'

const props = defineProps<{
  availableProjects: Project[],
  expense?: Expense
}>()

const emit = defineEmits<{
  (e: 'expense-created', formData: FormData): void,
  (e: 'expense-updated', formData: FormData): void,
  (e: 'cancel'): void
}>()

const isEditMode = computed(() => !!props.expense)
const rawAmount = ref('')
const amountTouched = ref(false)

const isAmountValid = computed(() => {
  return rawAmount.value !== '' && !isNaN(parseFloat(rawAmount.value))
})



const formattedAmount = computed({
  get() {
    if (!rawAmount.value) return ''
    const numericValue = parseFloat(rawAmount.value.replace(',', '.'))
    return isNaN(numericValue)
      ? ''
      : numericValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
  },
  set(value: string) {
    const numericValue = value.replace(/[^\d,]/g, '')
    rawAmount.value = numericValue
    form.amount = numericValue ? parseFloat(numericValue.replace(',', '.')) : 0
  }
});

const form = reactive({
  amount: props.expense ? props.expense.amount : 0,
  date: props.expense ? props.expense.date : '',
  description: props.expense ? props.expense.description : '',
  projectId: props.expense ? props.expense.project.id : '',
  projectTagId: props.expense ? props.expense.project_tag.id : '',
  receipt: props.expense ? props.expense.receipt : null,
  fiscal_coupon: props.expense ? props.expense.fiscal_coupon : null,
})

const selectedProjectId = ref<string | number>(form.projectId)
const availableTags = ref<ProjectTag[]>([])

watch(selectedProjectId, (newId) => {
  form.projectId = newId
  updateAvailableTags(newId)
})

onMounted(() => {
  if (isEditMode.value) {
    updateAvailableTags(form.projectId)
  }
})

function handleBlur() {
  amountTouched.value = true
}

function updateAvailableTags(projectId: string | number) {
  const project = props.availableProjects.find(p => p.id === Number(projectId))
  availableTags.value = project ? project.project_tags : []
}

const formTitle = computed(() => isEditMode.value ? 'Editar Solicitação de Reembolso' : 'Nova Solicitação de Reembolso')

const isSubmitting = ref(false)

function validateFile(file, field) {
  const allowedTypes = ['image/jpeg', 'application/pdf']
  
  if (!file || !allowedTypes.includes(file.type)) {
    alert('O arquivo deve ser um JPEG ou PDF.')
    return
  }

  form[field] = file
}

async function submitForm() {
  isSubmitting.value = true

  if (!isAmountValid.value) {
    alert('Por favor, insira um valor numérico válido.')
    isSubmitting.value = false
    return
  }

  const formData = new FormData()
  formData.append('expense[amount]', form.amount.toString())
  formData.append('expense[date]', form.date)
  formData.append('expense[description]', form.description)
  formData.append('expense[project_tag_id]', String(form.projectTagId))
  formData.append('expense[project_id]', String(form.projectId))
  if (form.receipt) {
    formData.append('expense[receipt]', form.receipt)
  }
  if (form.fiscal_coupon) {
    formData.append('expense[fiscal_coupon]', form.fiscal_coupon)
  }
  try {
    if (isEditMode.value) {
      emit('expense-updated', formData)
    } else {
      emit('expense-created', formData)
    }
  } catch (error) {
    console.error('Erro ao enviar solicitação:', error)
  } finally {
    isSubmitting.value = false
  }
}

function cancel() {
  emit('cancel')
}
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

.input-group {
  margin-bottom: 1rem;
}

.error-input {
  border-color: red !important;
}

.error-message {
  display: block;
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
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
