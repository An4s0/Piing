import type { ISession } from "@/types";
import pool from "@/database";
import initTable from "@/init-table";

export const sessionsService = {
  /**
   * Retrieve a single session matching the provided filters.
   *
   * @param where - Filters to uniquely identify a session.
   * @throws FIND_ONE_REQUIRES_CONDITION when no filter is provided.
   * @returns The matched session, or null if none is found.
   */
  async findOne(where: Partial<ISession>): Promise<ISession | null> {
    await initTable("sessions");

    const keys = Object.keys(where);
    const values = Object.values(where);

    if (keys.length === 0) {
      throw new Error("FIND_ONE_REQUIRES_CONDITION");
    }

    const sql = `
      SELECT * FROM sessions
      WHERE ${keys.map((k, i) => `"${k}" = $${i + 1}`).join(" AND ")}
      LIMIT 1
    `;

    const { rows } = await pool.query<ISession>(sql, values);
    return rows[0] ?? null;
  },

  /**
   * Retrieve multiple sessions matching the provided filters.
   *
   * @param where - Optional filters to match session fields.
   * @returns An array of sessions. Empty if no sessions are found.
   */
  async findMany(where: Partial<ISession> = {}): Promise<ISession[]> {
    await initTable("sessions");

    const keys = Object.keys(where);
    const values = Object.values(where);

    const sql =
      keys.length === 0
        ? "SELECT * FROM sessions"
        : `SELECT * FROM sessions WHERE ${keys
            .map((k, i) => `"${k}" = $${i + 1}`)
            .join(" AND ")}`;

    const { rows } = await pool.query<ISession>(sql, values);
    return rows;
  },

  /**
   * Create a new session record.
   *
   * @param data - Session fields required for creation.
   * @returns The newly created session.
   */
  async create(
    data: Pick<ISession, "user_id" | "token" | "expires_at">
  ): Promise<ISession> {
    await initTable("sessions");

    const { rows } = await pool.query<ISession>(
      `
      INSERT INTO sessions (user_id, token, expires_at)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [data.user_id, data.token, data.expires_at]
    );

    return rows[0];
  },

  /**
   * Update an existing session by ID.
   *
   * @param id - Session ID.
   * @param updates - Fields to update (excluding immutable fields).
   * @returns The updated session, or null if no update occurred.
   */
  async update(
    id: string,
    updates: Partial<Omit<ISession, "id" | "created_at">>
  ): Promise<ISession | null> {
    await initTable("sessions");

    const keys = Object.keys(updates);
    const values = Object.values(updates);

    if (keys.length === 0) return null;

    const setClause = keys.map((k, i) => `"${k}" = $${i + 1}`).join(", ");

    const { rows } = await pool.query<ISession>(
      `
      UPDATE sessions
      SET ${setClause}
      WHERE id = $${keys.length + 1}
      RETURNING *
      `,
      [...values, id]
    );

    return rows[0] ?? null;
  },

  /**
   * Permanently delete a session by ID.
   *
   * @param id - Session ID.
   * @returns True if the session was deleted, false otherwise.
   */
  async delete(id: string): Promise<boolean> {
    await initTable("sessions");

    const { rowCount } = await pool.query(
      "DELETE FROM sessions WHERE id = $1",
      [id]
    );

    return rowCount === 1;
  },

  /**
   * Delete all expired sessions from the database.
   *
   * @returns Number of deleted sessions.
   */
  async cleanupExpired(): Promise<number> {
    await initTable("sessions");

    const { rowCount } = await pool.query(
      "DELETE FROM sessions WHERE expires_at < NOW()"
    );

    return rowCount ?? 0;
  },
};
