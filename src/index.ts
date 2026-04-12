import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import { userModel } from "./db.js";

dotenv.config();

const JWT_PASSWORD = process.env.JWT_PASSWORD;

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    await userModel.create({
      username,
      password,
    });

    res.json({
      message: "User created successfully",
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username,
    password,
  });

  if (user) {
    const token = jwt.sign({ id: user._id }, JWT_PASSWORD as string);
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Invalid credentials",
    });
  }
});

app.post("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:sharelink", (req, res) => {});

async function main() {
  await mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}
main();
