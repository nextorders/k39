import type { Badge } from '@k39/database'

export const useBadgeStore = defineStore('badge', () => {
  const badges = ref<Badge[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/badge/list')
      if (!data) {
        return
      }

      badges.value = data
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

  return {
    badges,

    update,
  }
})
