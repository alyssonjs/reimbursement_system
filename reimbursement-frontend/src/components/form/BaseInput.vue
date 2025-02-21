<template>
    <div class="input-field">
      <label>{{ label }}</label>
      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :required="required"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'BaseInput',
    props: {
      label: { type: String, required: true },
      type: { type: String, default: 'text' },
      modelValue: { required: true },
      required: { type: Boolean, default: false },
    },
  });
  </script>
  
  <style scoped>
  .input-field {
    margin-bottom: 1rem;
  }
  .input-field label {
    display: block;
    margin-bottom: 0.5rem;
    color: #34495e;
    font-weight: 600;
  }
  .input-field input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }
  .input-field input:focus {
    border-color: #3498db;
    outline: none;
  }
  </style>
  