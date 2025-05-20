import { Kysely, SqliteDatabase, sql } from 'kysely';

// Migration: create screenings and tickets tables
export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('screenings')
    .ifNotExists()
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('movie_id', 'integer', col => col.notNull().references('movies.id'))
    .addColumn('starts_at', 'text', col => col.notNull())
    .addColumn('total_tickets', 'integer', col => col.notNull().check(sql`total_tickets >= 0`))
    .execute();

  await db.schema
    .createTable('tickets')
    .ifNotExists()
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('screening_id', 'integer', col => col.notNull().references('screenings.id'))
    .addColumn('user_email', 'text', col => col.notNull())
    .addColumn('booked_at', 'text', col => col.notNull().defaultTo('CURRENT_TIMESTAMP'))
    .addColumn('quantity', 'integer', col => col.notNull().check(sql`quantity > 0`))
    .execute();
}
export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.dropTable('tickets').ifExists().execute();
  await db.schema.dropTable('screenings').ifExists().execute();
}