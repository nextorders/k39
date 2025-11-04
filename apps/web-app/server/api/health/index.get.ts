import { repository } from '@k39/database'

export default defineEventHandler(async () => {
  try {
    await repository.checkHealth()

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
