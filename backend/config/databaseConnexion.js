import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const isProduction = process.env.NODE_ENV === "production";

let pool;

if (isProduction) {
  // PROD (Render) → on utilise DATABASE_URL + SSL
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // DEV LOCAL → on se connecte explicitement à ta base locale
  pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "fixio_local",
    password: "fixio_local123",
    database: "fixiotech_local",
    ssl: false,
  });
}

export const db = {
  query(text, params, callback) {
    if (typeof params === "function") {
      callback = params;
      params = [];
    }

    pool
      .query(text, params)
      .then((res) => callback(null, res))
      .catch((err) => callback(err));
  },
};

export async function assertDb() {
  try {
    const res = await pool.query("SELECT 1 AS ok");
    return res.rows[0].ok === 1;
  } catch (error) {
    console.error(error);
    return false;
  }
}
