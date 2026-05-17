<script setup>
defineProps({
  title: String,
  value: String,
  icon: String,
  tone: String,
})
</script>

<template>
  <v-card rounded="xl" elevation="0" class="pa-5">
    <div class="d-flex align-center justify-space-between">
      <div>
        <div class="text-soft text-body-2 mb-2">{{ title }}</div>
        <div class="text-h5 font-weight-bold">{{ value }}</div>
      </div>
      <v-avatar :color="tone" size="48" variant="tonal">
        <v-icon>{{ icon }}</v-icon>
      </v-avatar>
    </div>
  </v-card>
</template>
