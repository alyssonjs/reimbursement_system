<template>
    <div class="textarea-field">
      <label>{{ label }}</label>
      <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :required="required"
      ></textarea>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'BaseTextarea',
    props: {
      label: { type: String, required: true },
      modelValue: { type: String, required: true },
      required: { type: Boolean, default: false },
    },
  });
  </script>
  
  <style scoped>
  .textarea-field {
    margin-bottom: 1rem;
  }
  .textarea-field label {
    display: block;
    margin-bottom: 0.5rem;
    color: #34495e;
    font-weight: 600;
  }
  .textarea-field textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }
  .textarea-field textarea:focus {
    border-color: #3498db;
    outline: none;
  }
  </style>
  