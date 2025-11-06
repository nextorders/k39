<template>
  <div class="flex flex-row gap-4">
    <img :src="user?.avatarUrl ?? undefined" class="size-28 rounded-full">

    <div class="flex flex-col gap-2.5 justify-center">
      <h1 class="text-3xl/6 font-bold">
        {{ user?.name }}
      </h1>

      <USkeleton v-if="!userStore.ready" class="w-32 h-9" />
      <div v-else>
        <UButton
          v-if="canEditProfile"
          icon="i-lucide-edit"
          size="lg"
          color="neutral"
          variant="soft"
          class="w-fit"
          label="Редактировать профиль"
        />

        <template v-else>
          <UButton
            v-if="userStore.loggedIn"
            icon="i-lucide-user-plus"
            size="lg"
            color="neutral"
            variant="soft"
            class="w-fit"
            label="Подписаться"
          />
          <UButton
            v-else
            icon="i-lucide-user-plus"
            size="lg"
            color="neutral"
            variant="soft"
            class="w-fit"
            label="Подписаться"
            @click="tryActionThatRequiresLogin()"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = defineProps<{ user: { id: string, name: string, avatarUrl: string | null } }>()

const userStore = useUserStore()

const canEditProfile = computed(() => userStore.id === user.id)
</script>
