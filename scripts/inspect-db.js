import Database from 'better-sqlite3';
const db = new Database('data/movies.db', { readonly: true });

// 1) List all non-migration tables
const tables = db
  .prepare(`
    SELECT name 
    FROM sqlite_master 
    WHERE type='table' 
      AND name NOT LIKE 'kysely_%'
    ORDER BY name
  `)
  .all()
  .map(r => r.name);

console.log('Tables:', tables.join(', '));

// 2) Show 5 sample movies
const movies = db
  .prepare('SELECT id, title, year FROM movies LIMIT 5')
  .all();
console.log('\nSample movies:');
console.table(movies);

// 3) Show 5 sample screenings—(won’t exist yet, but good check)
const hasScreenings = tables.includes('screenings');
if (hasScreenings) {
  const screenings = db
    .prepare('SELECT * FROM screenings LIMIT 5')
    .all();
  console.log('\nSample screenings:');
  console.table(screenings);
} else {
  console.log('\nNo “screenings” table detected (yet).');
}

db.close();
