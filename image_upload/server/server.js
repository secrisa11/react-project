const express = require("express");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");
const mongoose = require("mongoose");

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
  .connect(
    "mongodb+srv://admin:FrZVXyUd5qGAx3ds@cluster0.ygatk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB Connected.");
    app.use("/uploads", express.static("uploads"));
    app.post("/upload", upload.single("image"), (req, res) => {
      res.json(req.file);
    });
    app.listen(PORT, () => {
      console.log(`Express server listening on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
