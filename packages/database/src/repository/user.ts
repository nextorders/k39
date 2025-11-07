import type { UserDraft, User as UserType, UserWithData } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { users } from '../tables'

export class User {
  static async find(id: string): Promise<UserWithData | undefined> {
    return useDatabase().query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
      with: {
        badges: true,
        badgeTasks: true,
      },
    })
  }

  static async findByEmail(email: string): Promise<UserWithData | undefined> {
    return useDatabase().query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
      with: {
        badges: true,
        badgeTasks: true,
      },
    })
  }

  static async findByUsername(username: string): Promise<UserWithData | undefined> {
    return useDatabase().query.users.findFirst({
      where: (users, { eq }) => eq(users.username, username),
      with: {
        badges: true,
        badgeTasks: true,
      },
    })
  }

  static async create(data: UserDraft): Promise<UserType> {
    const result = await useDatabase().insert(users).values(data).returning()

    if (result.length === 0) {
      throw new Error('User creation failed: no data returned from DB')
    }

    return result[0] as UserType
  }

  static async update(id: string, data: Omit<Partial<UserDraft>, 'id' | 'createdAt'>) {
    const [user] = await useDatabase()
      .update(users)
      .set({
        ...data,
        updatedAt: sql`now()`,
      })
      .where(eq(users.id, id))
      .returning()
    return user
  }

  static async updateOnline(id: string) {
    const [user] = await useDatabase().update(users).set({ onlineAt: sql`now()` }).where(eq(users.id, id)).returning()
    return user
  }

  static async delete(id: string) {
    return useDatabase().delete(users).where(eq(users.id, id))
  }
}
