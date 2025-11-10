<template>
  <UModal
    title="Войдите, чтобы продолжить"
    :ui="{
      content: 'max-w-sm',
    }"
  >
    <template #body>
      <div class="px-8 flex flex-col gap-2 items-center">
        <UIcon name="fluent-emoji-flat:cityscape" class="size-18 mx-auto" />

        <p class="text-base/5 text-center">
          Для доступа к этой функции нужно войти в аккаунт. Давайте продолжим?
        </p>
      </div>

      <UButton
        :to="link"
        variant="solid"
        color="primary"
        size="xl"
        block
        class="mt-5"
        label="Войти"
        @click="onClick()"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{ link: string, onClick: () => void }>()
</script>
