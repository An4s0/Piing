import type { IOtp } from "@/types";
import pool from "@/database";
import initTable from "@/init-table";

export const otpsService = {
  /**
   * Retrieve a single OTP record matching the provided filters.
   *
   * @param where - Filters to uniquely identify an OTP.
   * @throws FIND_ONE_REQUIRES_CONDITION when no filter is provided.
   * @returns The matched OTP or null if none is found.
   */
  async findOne(where: Partial<IOtp>): Promise<IOtp | null> {
    await initTable("otps");

    const keys = Object.keys(where);
    const values = Object.values(where);

    if (keys.length === 0) {
      throw new Error("FIND_ONE_REQUIRES_CONDITION");
    }

    const sql = `
      SELECT * FROM otps
      WHERE ${keys.map((k, i) => `"${k}" = $${i + 1}`).join(" AND ")}
      LIMIT 1
    `;

    const { rows } = await pool.query<IOtp>(sql, values);
    return rows[0] ?? null;
  },

  /**
   * Retrieve multiple OTP records matching the provided filters.
   *
   * @param where - Optional filters to match OTP fields.
   * @returns An array of OTP records.
   */
  async findMany(where: Partial<IOtp> = {}): Promise<IOtp[]> {
    await initTable("otps");

    const keys = Object.keys(where);
    const values = Object.values(where);

    const sql =
      keys.length === 0
        ? "SELECT * FROM otps"
        : `SELECT * FROM otps WHERE ${keys
            .map((k, i) => `"${k}" = $${i + 1}`)
            .join(" AND ")}`;

    const { rows } = await pool.query<IOtp>(sql, values);
    return rows;
  },

  /**
   * Create or replace an OTP for a specific user.
   * Only one OTP per user is allowed.
   *
   * @param data - OTP fields required for creation.
   * @returns The created or replaced OTP.
   */
  async create(
    data: Pick<IOtp, "user_id" | "code" | "expires_at">
  ): Promise<IOtp> {
    await initTable("otps");

    const { rows } = await pool.query<IOtp>(
      `
      INSERT INTO otps (user_id, code, expires_at)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id)
      DO UPDATE SET
        code = EXCLUDED.code,
        expires_at = EXCLUDED.expires_at,
        created_at = NOW()
      RETURNING *
      `,
      [data.user_id, data.code, data.expires_at]
    );

    return rows[0];
  },

  /**
   * Permanently delete an OTP by its ID.
   *
   * @param id - OTP ID.
   * @returns True if the OTP was deleted, false otherwise.
   */
  async remove(id: string): Promise<boolean> {
    await initTable("otps");

    const { rowCount } = await pool.query("DELETE FROM otps WHERE id = $1", [
      id,
    ]);

    return rowCount === 1;
  },

  /**
   * Remove all expired OTP records.
   *
   * @returns Number of deleted OTPs.
   */
  async cleanupExpired(): Promise<number> {
    await initTable("otps");

    const { rowCount } = await pool.query(
      "DELETE FROM otps WHERE expires_at < NOW()"
    );

    return rowCount ?? 0;
  },
};
