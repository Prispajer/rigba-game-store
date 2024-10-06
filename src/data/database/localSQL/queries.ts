import { ResultSetHeader } from "mysql2/promise";
import dataBase from "./connection";

export async function selectQuery<T>(
  query: string,
  params?: T[]
): Promise<Partial<T[]>> {
  try {
    const [results] = await dataBase.execute(query, params);
    return results as T[];
  } catch (error) {
    return [];
  }
}

export async function modifyQuery<T>(
  query: string,
  params?: T[]
): Promise<ResultSetHeader> {
  const [results] = await dataBase.execute(query, params);
  return results as ResultSetHeader;
}
