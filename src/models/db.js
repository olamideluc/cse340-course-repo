import { Pool } from 'pg';

// Create a connection pool for PostgreSQL
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false   // ✅ allows Render's self-signed certificate
  }
});

// Export the pool (db) for queries
let db = pool;

// Test the database connection
const testConnection = async () => {
  try {
    const result = await db.query('SELECT NOW() as current_time');
    console.log('Database connection successful:', result.rows[0].current_time);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw error;
  }
};

export { db as default, testConnection };
