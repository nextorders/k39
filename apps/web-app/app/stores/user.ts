import type { UserBadge, UserBadgeTask } from '@k39/database'

export const useUserStore = defineStore('user', () => {
  const id = ref<string | undefined>(undefined)
  const onlineAt = ref<string | undefined>(undefined)
  const avatarUrl = ref<string | undefined>(undefined)
  const username = ref<string | undefined>(undefined)
  const badges = ref<UserBadge[]>([])
  const badgeTasks = ref<UserBadgeTask[]>([])

  const ready = ref(false)
  const loggedIn = computed(() => !!id.value)

  const { idle } = useIdle(30_000) // 30 sec

  async function update() {
    try {
      const data = await $fetch('/api/auth/me')
      if (!data) {
        return
      }

      id.value = data.id
      onlineAt.value = data.onlineAt
      avatarUrl.value = data.avatarUrl ?? undefined
      username.value = data.username
      badges.value = data.badges
      badgeTasks.value = data.badgeTasks
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          // No session
        }
        if (error.message.includes('404')) {
          // Not found
        }
      }
    } finally {
      ready.value = true
    }
  }

  async function updateOnline() {
    try {
      if (!id.value || idle.value) {
        return
      }

      await $fetch(`/api/auth/me/online`, {
        method: 'POST',
      })
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          // No session
        }
        if (error.message.includes('404')) {
          // Not found
        }
      }
    }
  }

  function signOut() {
    id.value = undefined
    onlineAt.value = undefined
    avatarUrl.value = undefined
    username.value = undefined
    badges.value = []
    badgeTasks.value = []
  }

  return {
    id,
    onlineAt,
    avatarUrl,
    username,
    badges,
    badgeTasks,

    ready,
    loggedIn,

    update,
    updateOnline,
    signOut,
  }
})
