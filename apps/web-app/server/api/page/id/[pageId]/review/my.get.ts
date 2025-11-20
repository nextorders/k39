import { db } from '@k39/database'

export default defineEventHandler(async (event) => {
  try {
    const pageId = getRouterParam(event, 'pageId')
    if (!pageId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Id is required',
      })
    }

    const user = await getUserFromSession(event)

    const myPageReview = await db.pageReview.findByPageIdAndUserId(pageId, user.id)
    if (!myPageReview) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Review not found',
      })
    }

    return myPageReview
  } catch (error) {
    throw errorResolver(error)
  }
})
