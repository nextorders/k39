import { db } from '@k39/database'

export default defineEventHandler(async () => {
  try {
    return db.badge.list()
  } catch (error) {
    throw errorResolver(error)
  }
})
