import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import { contentModel, linkModel, userModel } from "./db.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./utils.js";

dotenv.config();

const JWT_PASSWORD = process.env.JWT_PASSWORD;

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = await userModel.create({
      username,
      password,
    });

    const token = jwt.sign({ id: newUser._id }, JWT_PASSWORD as string);

    res.json({
      message: "User created successfully",
      token,
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

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const { title, link } = req.body;
  await contentModel.create({
    title,
    link,
    //@ts-ignore
    userId: req.userId,
  });

  return res.json({
    message: "Content added",
  });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const allContent = await contentModel
    .find({
      userId,
    })
    .populate("userId", "username");

  if (allContent.length === 0) {
    return res.json({
      message: "No content found , please create content first",
    });
  }
  res.json({
    allContent,
  });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const { contentId } = req.body;
  //@ts-ignore
  const userId = req.userId;
  await contentModel.deleteMany({ _id: contentId, userId });

  res.json({
    message: "Content deleted",
  });
});

app.get("/api/v1/brain/is-sharable", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const link = await linkModel.findOne({
    userId,
  });

  if (link) {
    res.json({
      hash: link.hash,
    });
  } else {
    res.json({
      message: "Not Sharable",
    });
  }
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const { share } = req.body;

  if (share) {
    const existingLink = await linkModel.findOne({
      //@ts-ignore
      userId: req.userId,
    });

    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
    }

    const hash = random(10);
    await linkModel.create({
      // @ts-ignore
      userId: req.userId,
      hash: hash,
    });

    res.json({
      hash,
    });
  } else {
    const existingLink = await linkModel.findOne({
      //@ts-ignore
      userId: req.userId,
    });

    if (!existingLink) {
      res.json({
        message: "No Link Found",
      });
      return;
    }

    await linkModel.deleteOne({
      //@ts-ignore
      userId: req.userId,
    });

    res.json({
      message: "Removed Link",
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await linkModel.findOne({
    hash: hash,
  });

  if (!link) {
    res.json({
      message: "Sorry Incorrect Input",
    });
    return;
  }

  const content = await contentModel.find({
    userId: link.userId,
  });

  const user = await userModel.findOne({
    _id: link.userId,
  });

  res.json({
    username: user?.username,
    content,
  });
});

app.get("/api/v1/settings", userMiddleware, async (req, res) => {
  //@ts-ignore
  const user = await userModel.findOne({
    //@ts-ignore
    _id: req.userId,
  });

  const link = await linkModel.findOne({
    //@ts-ignore
    userId: req.userId,
  });

  const sharable = link ? true : false;

  res.json({
    username: user?.username,
    sharable,
  });
});

async function main() {
  await mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
main();
