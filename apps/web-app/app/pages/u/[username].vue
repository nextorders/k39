<template>
  <UContainer>
    <div class="my-4 lg:py-6 flex flex-col gap-4">
      <div class="flex flex-col lg:flex-row gap-2 justify-between">
        <UserAvatarBlock v-if="user" :user="user" />

        <div class="flex flex-row gap-6">
          <UserFollowers
            :count="12"
            label="Подписчиков"
            :avatars="user?.followers.top ?? []"
          />
          <UserFollowers
            :count="5"
            label="Подписок"
            :avatars="user?.following.top ?? []"
          />
        </div>
      </div>

      <div class="mt-2 flex flex-row gap-6">
        <Badge type="expert_of_region" :level="4" />
        <Badge type="author" :level="2" />
        <Badge type="likes_collector" :level="1" />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { params } = useRoute('u-username___ru')

const { data: user } = await useFetch(`/api/user/username/${params.username}`)

if (!user.value) {
  await navigateTo('/')
}

useHead({
  title: `${user.value?.name} @${params.username}`,
})
</script>
