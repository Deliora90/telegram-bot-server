import "module-alias/register";
import express from "express";
import mongoose from "mongoose";
import { startBot } from "@api/telegram";

const app = express();

app.use(express.static("public"));
app.use(express.json());

const start = async () => {
  try {
    await mongoose.connect(process.env.DB);

    app.listen(process.env.PORT, function () {
      console.log("Server started on port " + process.env.PORT);
    });

    startBot();
  } catch (error) {
    console.error(error);
  }
};

start();
