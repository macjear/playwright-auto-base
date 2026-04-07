import oracledb, { Connection, Pool } from 'oracledb';

/**
 * OracleDBConnection — provides pooled Oracle database connections.
 *
 * Required environment variables:
 *   DG_ORACLE_DB_URL      — Oracle connection string (e.g. host:1521/service)
 *   DG_ORACLE_DB_USER     — database username
 *   DG_ORACLE_DB_PASSWORD — database password
 */
export class OracleDBConnection {
  private static pool: Pool | null = null;

  private constructor() {}

  private static async buildPool(): Promise<Pool> {
    return oracledb.createPool({
      connectString: process.env.DG_ORACLE_DB_URL,
      user: process.env.DG_ORACLE_DB_USER,
      password: process.env.DG_ORACLE_DB_PASSWORD,
      poolMin: 5,
      poolMax: 10,
    });
  }

  /**
   * Returns a pooled Oracle connection. Caller is responsible for closing it via `connection.close()`.
   *
   * @returns Connection
   */
  static async getConnection(): Promise<Connection> {
    console.info('Get Oracle db connection');
    if (!OracleDBConnection.pool) {
      OracleDBConnection.pool = await OracleDBConnection.buildPool();
    }
    return OracleDBConnection.pool.getConnection();
  }
}
