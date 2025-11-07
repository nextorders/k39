import { useDatabase } from '../database'
import { Badge } from './badge'
import { User } from './user'

class Repository {
  readonly badge = Badge
  readonly user = User

  async checkHealth(): Promise<boolean> {
    await useDatabase().query.users.findFirst()
    return true
  }
}

export const repository = new Repository()
