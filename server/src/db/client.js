import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import path from 'node:path'
import fs from 'node:fs'
import * as schema from './schema.js'

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data')
export const UPLOADS_DIR = path.join(DATA_DIR, 'uploads')

fs.mkdirSync(DATA_DIR, { recursive: true })
fs.mkdirSync(UPLOADS_DIR, { recursive: true })

const sqlite = new Database(path.join(DATA_DIR, 'db.sqlite'))
sqlite.pragma('journal_mode = WAL')
sqlite.pragma('foreign_keys = ON')

sqlite.exec(`
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  recovery_email TEXT,
  password_changed_at INTEGER,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS password_reset_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  code_hash TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  used_at INTEGER,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL,
  prestation TEXT,
  alt TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS albums (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titre TEXT NOT NULL,
  lieu TEXT NOT NULL,
  tag TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  published INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS album_photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  album_id INTEGER NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS gallery_photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section TEXT NOT NULL,
  filename TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS site_images (
  key TEXT PRIMARY KEY,
  filename TEXT,
  alt TEXT NOT NULL DEFAULT '',
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS news_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  body_markdown TEXT NOT NULL DEFAULT '',
  cover_image TEXT,
  published INTEGER NOT NULL DEFAULT 0,
  published_at INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS quote_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT,
  telephone TEXT NOT NULL,
  type_evenement TEXT NOT NULL,
  date_evenement TEXT NOT NULL,
  heure_debut TEXT NOT NULL,
  lieu_evenement TEXT NOT NULL,
  nombre_personnes TEXT NOT NULL,
  duree_jours INTEGER NOT NULL DEFAULT 0,
  duree_heures INTEGER NOT NULL DEFAULT 0,
  duree_minutes INTEGER NOT NULL DEFAULT 0,
  experience_cocktails TEXT NOT NULL,
  type_cocktails TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  rappel_telephone TEXT NOT NULL,
  email_sent INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
`)

// Migration légère pour les bases déjà créées avant l'ajout de ces colonnes.
for (const statement of [
  'ALTER TABLE admin_users ADD COLUMN recovery_email TEXT',
  'ALTER TABLE admin_users ADD COLUMN password_changed_at INTEGER',
]) {
  try {
    sqlite.exec(statement)
  } catch {
    // Colonne déjà présente — rien à faire.
  }
}

export const db = drizzle(sqlite, { schema })
export { sqlite, DATA_DIR }
