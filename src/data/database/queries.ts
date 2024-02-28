import { ResultSetHeader } from "mysql2/promise";
import dataBase from "./connection";

export async function selectQuery<T>(
  query: string,
  params: any[] = []
): Promise<Partial<T>[]> {
  try {
    const [results] = await dataBase.execute(query, params);
    return results as T[];
  } catch (error) {
    console.log("Coś poszło nie tak!", error);
    return [];
  }
}

export async function ModifyQuery(
  query: string,
  params: any[] = []
): Promise<ResultSetHeader> {
  const [results] = await dataBase.execute(query, params);
  return results as ResultSetHeader;
}
