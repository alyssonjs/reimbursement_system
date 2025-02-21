<template>
    <div class="select-field">
      <label>{{ label }}</label>
      <select
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :required="required"
      >
        <slot></slot>
      </select>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'BaseSelect',
    props: {
      label: { type: String, required: true },
      modelValue: { required: true },
      required: { type: Boolean, default: false },
    },
  });
  </script>
  
  <style scoped>
  .select-field {
    margin-bottom: 1rem;
  }
  .select-field label {
    display: block;
    margin-bottom: 0.5rem;
    color: #34495e;
    font-weight: 600;
  }
  .select-field select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }
  .select-field select:focus {
    border-color: #3498db;
    outline: none;
  }
  </style>
  