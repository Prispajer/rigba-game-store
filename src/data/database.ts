import mysql from "mysql2/promise";

interface QueryOptions {
  query: string;
  values?: any[];
}

export async function query({ query, values = [] }: QueryOptions) {
  const dataBase = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  try {
    const [results] = await dataBase.execute(query, values);
    await dataBase.end();
    return results;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
