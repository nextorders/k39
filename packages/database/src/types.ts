import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type * as tables from './tables'

export type { Database } from './connection'

export type User = InferSelectModel<typeof tables.users>
export type UserDraft = InferInsertModel<typeof tables.users>

export type Page = InferSelectModel<typeof tables.pages>
export type PageDraft = InferInsertModel<typeof tables.pages>

export type Point = InferSelectModel<typeof tables.points>
export type PointDraft = InferInsertModel<typeof tables.points>
