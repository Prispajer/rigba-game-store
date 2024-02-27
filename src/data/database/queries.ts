import { ResultSetHeader } from "mysql2/promise";
import { User } from "@/utils/types";
import dataBase from "./connection";

export async function selectQuery<T>(query: string): Promise<Partial<T>[]> {
  try {
    const [results] = await dataBase.execute(query);
    return results as T[];
  } catch (error) {
    console.log("Coś poszło nie tak!", error);
    return [];
  }
}

export async function ModifyQuery(query: string): Promise<ResultSetHeader> {
  const [results] = await dataBase.execute(query);
  return results as ResultSetHeader;
}

ModifyQuery<User>(`UPDATE Users SET email = "xd" WHERE id = 1;`)
  .then((users) => console.log(users))
  .catch((event) => console.log(event));
