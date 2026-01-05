import pool from "@/database";
import initTable from "@/init-table";
import type { ISession } from "@/types";

export const sessionsService = {
  async find(where: Partial<ISession> = {}) {
    await initTable("sessions");

    // cleanup expired sessions
    await pool.query(`DELETE FROM sessions WHERE expires_at < NOW()`);

    const keys = Object.keys(where);
    const values = Object.values(where);

    const sql =
      keys.length === 0
        ? "SELECT * FROM sessions"
        : `SELECT * FROM sessions WHERE ${keys
            .map((k, i) => `"${k}" = $${i + 1}`)
            .join(" AND ")}`;

    const { rows } = await pool.query<ISession>(sql, values);

    return rows.length === 1 ? rows[0] : rows;
  },

  async create(data: Omit<ISession, "id" | "created_at">) {
    await initTable("sessions");

    const { rows } = await pool.query<ISession>(
      `INSERT INTO sessions (user_id, token, expires_at)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [data.user_id, data.token, data.expires_at]
    );

    return rows[0] ?? null;
  },

  async update(id: string, data: Partial<ISession>) {
    if (!id) throw "SESSION_ID_REQUIRED";

    await initTable("sessions");

    const keys = Object.keys(data);
    if (keys.length === 0) return null;

    const values = Object.values(data);

    const set = keys.map((k, i) => `"${k}" = $${i + 1}`).join(", ");

    const { rows } = await pool.query<ISession>(
      `UPDATE sessions
       SET ${set}, last_seen_at = NOW()
       WHERE id = $${values.length + 1}
       RETURNING *`,
      [...values, id]
    );

    return rows[0] ?? null;
  },

  async delete(id: string) {
    if (!id) throw "SESSION_ID_REQUIRED";

    await initTable("sessions");

    const { rowCount } = await pool.query(
      `DELETE FROM sessions WHERE id = $1`,
      [id]
    );

    if (!rowCount) throw "SESSION_NOT_FOUND";
  },
};
