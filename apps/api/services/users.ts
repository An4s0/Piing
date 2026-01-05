import pool from "@/database";
import initTable from "@/init-table";
import type { IUser } from "@piing/types";

export const usersService = {
  async find(where: Partial<IUser> = {}) {
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

    return rows.length === 1 ? rows[0] : rows;
  },

  async create(user: Pick<IUser, "name" | "email" | "password">) {
    await initTable("users");

    const { rows } = await pool.query<IUser>(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user.name, user.email, user.password]
    );

    return rows[0] ?? null;
  },
};
