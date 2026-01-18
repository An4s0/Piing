import pool from "@/database";
import initTable from "@/init-table";

export abstract class BaseService<T extends { id: string }> {
  private table: string;

  constructor(table: string) {
    this.table = table;
  }

  private async init() {
    await initTable(this.table);
  }

  /**
   * Retrieve a single record matching the provided filters.
   *
   * @param where - Filters to uniquely identify a record.
   * @throws FIND_ONE_REQUIRES_CONDITION when no filter is provided.
   * @returns The matched record, or null if none is found.
   */
  async findOne(where: Partial<T>): Promise<T | null> {
    await this.init();

    const keys = Object.keys(where);
    const values = Object.values(where);

    if (keys.length === 0) {
      throw new Error("FIND_ONE_REQUIRES_CONDITION");
    }

    const sql = `
      SELECT * FROM ${this.table}
      WHERE ${keys.map((k, i) => `"${k}" = $${i + 1}`).join(" AND ")}
      LIMIT 1
    `;

    const { rows } = await pool.query<T>(sql, values);
    return rows[0] ?? null;
  }

  /**
   * Retrieve multiple records matching the provided filters.
   *
   * @param where - Optional filters to match record fields.
   * @returns An array of records. Empty if no records are found.
   */
  async findMany(where: Partial<T> = {}): Promise<T[]> {
    await this.init();

    const keys = Object.keys(where);
    const values = Object.values(where);

    const sql =
      keys.length === 0
        ? `SELECT * FROM ${this.table}`
        : `SELECT * FROM ${this.table} WHERE ${keys
            .map((k, i) => `"${k}" = $${i + 1}`)
            .join(" AND ")}`;

    const { rows } = await pool.query<T>(sql, values);
    return rows;
  }

  /**
   * Create a new record.
   *
   * @param data - Fields required to create the record.
   * @throws CREATE_REQUIRES_DATA when no data is provided.
   * @returns The newly created record.
   */
  async create(data: Partial<T>): Promise<T> {
    await this.init();

    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) {
      throw new Error("CREATE_REQUIRES_DATA");
    }

    const sql = `
      INSERT INTO ${this.table} (${keys.map((k) => `"${k}"`).join(", ")})
      VALUES (${keys.map((_, i) => `$${i + 1}`).join(", ")})
      RETURNING *
    `;

    const { rows } = await pool.query<T>(sql, values);
    return rows[0];
  }

  /**
   * Update an existing record by ID.
   *
   * @param id - Record ID.
   * @param updates - Fields to update.
   * @throws UPDATE_REQUIRES_DATA when no update fields are provided.
   * @returns The updated record.
   */
  async update(id: string, updates: Partial<T>): Promise<T> {
    await this.init();

    const keys = Object.keys(updates);
    const values = Object.values(updates);

    if (keys.length === 0) {
      throw new Error("UPDATE_REQUIRES_DATA");
    }

    const sql = `
      UPDATE ${this.table}
      SET ${keys.map((k, i) => `"${String(k)}" = $${i + 1}`).join(", ")}
      WHERE id = $${keys.length + 1}
      RETURNING *
    `;

    const { rows } = await pool.query<T>(sql, [...values, id]);
    return rows[0];
  }

  /**
   * Permanently delete a record by ID.
   *
   * @param id - Record ID.
   * @throws DELETE_REQUIRES_ID when ID is missing.
   * @returns True if the record was deleted, false otherwise.
   */
  async delete(id: string): Promise<boolean> {
    await this.init();

    if (!id) {
      throw new Error("DELETE_REQUIRES_ID");
    }

    const { rowCount } = await pool.query(
      `DELETE FROM ${this.table} WHERE id = $1`,
      [id],
    );

    return rowCount === 1;
  }
}
