import express, { Application, Request, Response, NextFunction } from "express";
require("express-async-errors");
import * as dotenv from "dotenv";
import cors from "cors";
import path from "path";
import dbConnection from "./utils/dbConnection";
import { failure } from "./utils/helper";
import router from "./routes";

dotenv.config();
const app: Application = express();
//db connection
dbConnection();
//server middleware
app.use("/",express.static(__dirname + "/public"));
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);  
//routes
app.use("/api", router);

//test root route
app.get("/test", async (req: Request, res: Response) => {
  res.send("Helloworld!");
});
// static files and serve  react app
// if (process.env.NODE_ENV === 'production') {
//   app.use('/',express.static(path.join(__dirname, '../../frontend', 'build')));
//   // app.use("/",express.static(__dirname + "/public"));
  
//   app.get('/*', (req:Request, res:Response) => {
//     res.sendFile(path.join(__dirname, '../../frontend', 'build', 'index.html'));
//   })
// }

//404 error handler
app.use("*", (req: Request, res: Response) =>
  res.status(404).json(failure("Page not found."))
);

// Global route error handling middleware
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.log("****SERVER_ERROR****");
  console.log(err);
  return res.status(500).json(failure(err.message || "Something went wrong!"));
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
