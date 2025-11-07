import type { UserBadgeTaskStatus } from './types'
import { cuid2 } from 'drizzle-cuid2/postgres'
import { relations } from 'drizzle-orm'
import { boolean, integer, jsonb, numeric, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  onlineAt: timestamp('online_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  email: varchar('email').notNull().unique(),
  username: varchar('username').notNull().unique(),
  name: varchar('name').notNull(),
  phone: varchar('phone'),
  avatarUrl: varchar('avatar_url'),
  level: integer('level').notNull().default(0),
  xp: integer('xp').notNull().default(0),
  xpToNextLevel: integer('xp_to_next_level').notNull().default(0),
})

export const badges = pgTable('badges', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  title: varchar('title').notNull(),
  description: varchar('description'),
  imageUrl: varchar('image_url'),
  imageAnimatedUrl: varchar('image_animated_url'),
  isActive: boolean('is_active').notNull().default(true),
})

export const badgeLevels = pgTable('badge_levels', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  levelNumber: integer('level_number').notNull().default(0),
  requiredXp: integer('required_xp').notNull().default(0),
  badgeId: cuid2('badge_id').notNull().references(() => badges.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const userBadges = pgTable('user_badges', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  currentLevel: integer('current_level').notNull().default(0),
  totalXp: integer('total_xp').notNull().default(0),
  userId: cuid2('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  badgeId: cuid2('badge_id').notNull().references(() => badges.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const userBadgeTasks = pgTable('user_badge_tasks', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  completedAt: timestamp('completed_at', { precision: 3, mode: 'string' }),
  expiresAt: timestamp('expires_at', { precision: 3, mode: 'string' }),
  rewardXp: integer('reward_xp').notNull().default(0),
  status: varchar('status').notNull().default('active').$type<UserBadgeTaskStatus>(),

  // { type: 'write_review', progress: 0, target: 1 }
  conditions: jsonb('conditions').notNull(),

  userId: cuid2('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  badgeId: cuid2('badge_id').notNull().references(() => badges.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  targetBadgeLevelId: cuid2('target_badge_level_id').notNull().references(() => badgeLevels.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const pages = pgTable('pages', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  slug: varchar('slug').notNull(),
  title: varchar('title').notNull(),
  description: varchar('description'),
  rating: numeric('rating', { mode: 'number' }).notNull().default(0),
})

export const points = pgTable('points', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  title: varchar('name').notNull(),
  address: varchar('address').notNull(),
  pageId: cuid2('page_id').notNull().references(() => pages.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const userRelations = relations(users, ({ many }) => ({
  badges: many(userBadges),
  badgeTasks: many(userBadgeTasks),
}))

export const badgeRelations = relations(badges, ({ many }) => ({
  levels: many(badgeLevels),
  userBadges: many(userBadges),
  userBadgeTasks: many(userBadgeTasks),
}))

export const badgeLevelRelations = relations(badgeLevels, ({ many }) => ({
  tasks: many(userBadgeTasks),
}))

export const userBadgeRelations = relations(userBadges, ({ one }) => ({
  user: one(users, {
    fields: [userBadges.userId],
    references: [users.id],
  }),
  badge: one(badges, {
    fields: [userBadges.badgeId],
    references: [badges.id],
  }),
}))

export const userBadgeTaskRelations = relations(userBadgeTasks, ({ one }) => ({
  user: one(users, {
    fields: [userBadgeTasks.userId],
    references: [users.id],
  }),
  badge: one(badges, {
    fields: [userBadgeTasks.badgeId],
    references: [badges.id],
  }),
  targetLevel: one(badgeLevels, {
    fields: [userBadgeTasks.targetBadgeLevelId],
    references: [badgeLevels.id],
  }),
}))

export const pageRelations = relations(pages, ({ many }) => ({
  points: many(points),
}))

export const pointRelations = relations(points, ({ one }) => ({
  page: one(pages, {
    fields: [points.pageId],
    references: [pages.id],
  }),
}))
