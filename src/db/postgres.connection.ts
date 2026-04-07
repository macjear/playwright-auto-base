import { Pool, PoolClient } from 'pg';

/**
 * PostgresConnection — provides pooled PostgreSQL connections.
 *
 * Limitation: best suited for tables with less than 100,000 rows.
 * For larger datasets consider a streaming / cursor approach.
 *
 * Required environment variables:
 *   DG_POSTGRE_DB_URL      — connection string  (e.g. postgres://host:5432/db)
 *   DG_POSTGRE_DB_USER     — database username
 *   DG_POSTGRE_DB_PASSWORD — database password
 */
export class PostgresConnection {
  private static pool: Pool | null = null;

  private constructor() {}

  private static buildPool(): Pool {
    return new Pool({
      connectionString: process.env.DG_POSTGRE_DB_URL,
      user: process.env.DG_POSTGRE_DB_USER,
      password: process.env.DG_POSTGRE_DB_PASSWORD,
      min: 5,
      max: 10,
    });
  }

  /**
   * Returns a pooled client. Caller is responsible for releasing it via `client.release()`.
   *
   * @returns PoolClient
   */
  static async getConnection(): Promise<PoolClient> {
    console.info('Get Postgres db connection');
    if (!PostgresConnection.pool) {
      PostgresConnection.pool = PostgresConnection.buildPool();
    }
    return PostgresConnection.pool.connect();
  }
}
