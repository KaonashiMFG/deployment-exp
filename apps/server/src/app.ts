import "dotenv/config";

import express from "express";
// import prisma from "./configs/prisma";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = 9000;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hi world");
});

app.get("/user", async (req, res) => {
  try {
    const user = await prisma.user.findMany();

    res.status(200).json({ ok: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error finding user" });
  }
});

app.post("/user", async (req, res) => {
  try {
    const { name, email } = req.body;

    await prisma.user.create({
      data: { name: name, email: email },
    });

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
});

app.listen(PORT, () => {
  console.info(`Server is listening on port ${PORT}`);
});

export default app;