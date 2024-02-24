import { query } from "../../data/database";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const registerData = await query({
        query: "SELECT * FROM Users",
        values: [],
      });

      res.status(200).json({ registerData: registerData });
    } catch (error) {
      throw new Error("Wystąpił błąd przy pobieraniu danych z bazy danych.");
    }
  }
}
