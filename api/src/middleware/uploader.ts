import multer from "multer";
import path from "path";
import fs from "fs";
import { getRouteName } from "../utils/helper";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let type = getRouteName(req.url);
    switch (type) {
      case "director":
        checkIfDirectoryExits("director");
        cb(null, path.join(__dirname, "/../public/director/"));
        break;
      case "movie":
        checkIfDirectoryExits("movie");
        cb(null, path.join(__dirname, "/../public/movie/"));
        break;
      default:
        checkIfDirectoryExits("uploads");
        cb(null, path.join(__dirname, "/../public/uploads/"));
        break;
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      getRouteName(req.url) + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
export const uploader = multer({
  storage,
  limits: { fileSize: 209715200 },
}).any();

function checkIfDirectoryExits(directoryName: string) {
  let fullPath = path.join(__dirname, `/../public/${directoryName}/`);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath);
  }
}
