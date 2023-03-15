import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== "GET") {
    res.status(405).end();
  }

  try {
    const { user } = await serverAuth(req);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(401).end();
  }
}

export default handler;