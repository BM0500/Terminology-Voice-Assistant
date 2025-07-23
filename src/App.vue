<template>
  <div id="app">
    <router-view />
    <Toaster position="top-right" :duration="3000" />
  </div>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'
</script>

<style scoped>
</style>