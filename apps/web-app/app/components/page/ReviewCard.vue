<template>
  <div class="border border-default rounded-lg px-4 sm:px-6">
    Тут текст отзыва
  </div>
</template>

<script setup lang="ts">
import type { PageWithData } from '@k39/database'

defineProps<{ review: PageWithData['reviews'][number] }>()
</script>
