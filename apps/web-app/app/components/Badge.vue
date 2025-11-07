<template>
  <div class="max-w-28 flex flex-col gap-3 justify-start items-center">
    <div class="relative group ring-2 ring-default rounded-lg">
      <img
        v-if="badge.imageUrl"
        :src="badge.imageUrl"
        class="group-hover:hidden p-3 bg-white size-20 rounded-lg"
      >
      <img
        v-if="badge.imageAnimatedUrl"
        :src="badge.imageAnimatedUrl"
        class="hidden group-hover:block size-20 rounded-lg"
      >

      <div v-if="level" class="absolute bottom-0 right-0">
        <div class="mx-auto w-8 h-5 flex flex-row items-center justify-center bg-neutral-200 rounded-tl-lg rounded-br-lg">
          <p class="text-lg text-neutral-900 font-semibold">
            {{ level }}
          </p>
        </div>
      </div>
    </div>

    <h4 class="text-base/4 font-semibold text-center">
      {{ badge.title }}
    </h4>
  </div>
</template>

<script setup lang="ts">
import type { Badge } from '@k39/database'

defineProps<{ badge: Badge, level?: number }>()
</script>
