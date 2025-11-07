import { useDatabase } from '../database'

export class Badge {
  static async find(id: string) {
    return useDatabase().query.badges.findFirst({
      where: (badges, { eq }) => eq(badges.id, id),
    })
  }

  static async list() {
    return useDatabase().query.badges.findMany()
  }
}
