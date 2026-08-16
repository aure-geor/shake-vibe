import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const adminUsers = sqliteTable('admin_users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  recoveryEmail: text('recovery_email'),
  passwordChangedAt: integer('password_changed_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const passwordResetCodes = sqliteTable('password_reset_codes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  adminId: integer('admin_id').notNull(),
  codeHash: text('code_hash').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  usedAt: integer('used_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const photos = sqliteTable('photos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  filename: text('filename').notNull(),
  prestation: text('prestation'),
  alt: text('alt').notNull().default(''),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const albums = sqliteTable('albums', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  titre: text('titre').notNull(),
  lieu: text('lieu').notNull(),
  tag: text('tag').notNull(),
  description: text('description').notNull().default(''),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

export const albumPhotos = sqliteTable('album_photos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  albumId: integer('album_id').notNull(),
  filename: text('filename').notNull(),
  alt: text('alt').notNull().default(''),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const siteContent = sqliteTable('site_content', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

export const galleryPhotos = sqliteTable('gallery_photos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  section: text('section').notNull(),
  filename: text('filename').notNull(),
  alt: text('alt').notNull().default(''),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const siteImages = sqliteTable('site_images', {
  key: text('key').primaryKey(),
  filename: text('filename'),
  alt: text('alt').notNull().default(''),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

export const newsPosts = sqliteTable('news_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull().default(''),
  bodyMarkdown: text('body_markdown').notNull().default(''),
  coverImage: text('cover_image'),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  publishedAt: integer('published_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

export const quoteRequests = sqliteTable('quote_requests', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nom: text('nom').notNull(),
  prenom: text('prenom').notNull(),
  email: text('email'),
  telephone: text('telephone').notNull(),
  typeEvenement: text('type_evenement').notNull(),
  dateEvenement: text('date_evenement').notNull(),
  heureDebut: text('heure_debut').notNull(),
  lieuEvenement: text('lieu_evenement').notNull(),
  nombrePersonnes: text('nombre_personnes').notNull(),
  dureeJours: integer('duree_jours').notNull().default(0),
  dureeHeures: integer('duree_heures').notNull().default(0),
  dureeMinutes: integer('duree_minutes').notNull().default(0),
  experienceCocktails: text('experience_cocktails').notNull(),
  typeCocktails: text('type_cocktails').notNull(),
  description: text('description').notNull().default(''),
  rappelTelephone: text('rappel_telephone').notNull(),
  emailSent: integer('email_sent', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
