export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    if (!query.provider) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Provider is required',
      })
    }

    // If redirectTo is provided, save it
    if (query?.redirectTo) {
      setCookie(event, 'redirectTo', query.redirectTo.toString())
    }

    sendRedirect(event, `/api/auth/${query.provider}`)
  } catch (error) {
    throw errorResolver(error)
  }
})
