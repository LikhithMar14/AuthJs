import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import db from "../../../db/index"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const user = await db.user.findFirst({
        where:{email}
      })
      if (!user || !user.password) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      return res.status(200).json({ success: "Login successful" });
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
