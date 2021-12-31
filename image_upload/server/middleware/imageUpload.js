const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");

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

module.exports = { upload };
