import type { IUser } from "@piing/types";
import pool from "@/database";
import initTable from "@/init-table";

export const usersService = {
  /**
   * Retrieve a single user matching the provided filters.
   *
   * @param where - Filters to uniquely identify a user.
   * @throws FIND_ONE_REQUIRES_CONDITION when no filter is provided.
   * @returns The matched user, or null if none is found.
   */
  async findOne(where: Partial<IUser>): Promise<IUser | null> {
    await initTable("users");

    const keys = Object.keys(where);
    const values = Object.values(where);

    if (keys.length === 0) {
      throw new Error("FIND_ONE_REQUIRES_CONDITION");
    }

    const sql = `
      SELECT * FROM users
      WHERE ${keys.map((k, i) => `"${k}" = $${i + 1}`).join(" AND ")}
      LIMIT 1
    `;

    const { rows } = await pool.query<IUser>(sql, values);
    return rows[0] ?? null;
  },

  /**
   * Retrieve multiple users matching the provided filters.
   *
   * @param where - Optional filters to match user fields.
   * @returns An array of users. Empty if no users are found.
   */
  async findMany(where: Partial<IUser> = {}): Promise<IUser[]> {
    await initTable("users");

    const keys = Object.keys(where);
    const values = Object.values(where);

    const sql =
      keys.length === 0
        ? "SELECT * FROM users"
        : `SELECT * FROM users WHERE ${keys
            .map((k, i) => `"${k}" = $${i + 1}`)
            .join(" AND ")}`;

    const { rows } = await pool.query<IUser>(sql, values);
    return rows;
  },

  /**
   * Create a new user record.
   *
   * @param user - User fields required to create a new user.
   * @returns The newly created user.
   */
  async create(
    user: Pick<IUser, "name" | "email" | "password_hash">
  ): Promise<IUser> {
    await initTable("users");

    const { rows } = await pool.query<IUser>(
      `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [user.name, user.email, user.password_hash]
    );

    return rows[0];
  },

  /**
   * Update an existing user by ID.
   *
   * @param id - User ID.
   * @param updates - Fields to update.
   * @returns The updated user, or null if no update occurred.
   */
  async update(
    id: string,
    updates: Partial<Omit<IUser, "id" | "created_at">>
  ): Promise<IUser | null> {
    await initTable("users");

    const keys = Object.keys(updates);
    const values = Object.values(updates);

    if (keys.length === 0) return null;

    const setClause = keys.map((k, i) => `"${k}" = $${i + 1}`).join(", ");

    const { rows } = await pool.query<IUser>(
      `
      UPDATE users
      SET ${setClause}
      WHERE id = $${keys.length + 1}
      RETURNING *
      `,
      [...values, id]
    );

    return rows[0] ?? null;
  },

  /**
   * Permanently delete a user by ID.
   *
   * @param id - User ID.
   * @returns True if the user was deleted, false otherwise.
   */
  async delete(id: string): Promise<boolean> {
    await initTable("users");

    const { rowCount } = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);

    return rowCount === 1;
  },
};
