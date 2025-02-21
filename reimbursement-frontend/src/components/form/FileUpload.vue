<template>
    <div class="file-upload">
      <label>{{ label }}</label>
      <input type="file" @change="onFileChange" :required="required" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'FileUpload',
    props: {
      label: { type: String, required: true },
      required: { type: Boolean, default: false },
    },
    methods: {
      onFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
          this.$emit('file-selected', target.files[0]);
        }
      },
    },
  });
  </script>
  
  <style scoped>
  .file-upload {
    margin-bottom: 1rem;
  }
  .file-upload label {
    display: block;
    margin-bottom: 0.5rem;
    color: #34495e;
    font-weight: 600;
  }
  </style>
  