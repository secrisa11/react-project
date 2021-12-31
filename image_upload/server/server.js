require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");
const mongoose = require("mongoose");
const Image = require("./models/Image");

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, "./uploads"),
  filename: (req, file, callback) =>
    callback(null, `${uuid()}.${mime.extension(file.mimetype)}`),
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (["image/png", "image/jpeg"].includes(file.mimetype))
      callback(null, true);
    else callback(new Error("Invalid file type"), false);
  },
  limits: { fileSize: 1024 * 1024 * 5 },
});

const app = express();
const PORT = 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected.");
    app.use("/uploads", express.static("uploads"));
    app.post("/upload", upload.single("image"), async (req, res) => {
      await new Image({
        key: req.file.filename,
        originalFileName: req.file.originalname,
      }).save();
      res.json(req.file);
    });
    app.listen(PORT, () => {
      console.log(`Express server listening on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
