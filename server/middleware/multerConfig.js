const multer = require("multer");
const path = require("path");

// Multer ayarları
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

// Multer'ı yapılandırın
const upload = multer({ storage: storage });

module.exports = upload;
