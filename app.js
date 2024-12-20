import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { dbConnection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import timelineRouter from "./routes/timeLineRouter.js";
import messageRouter from "./routes/messageRouter.js";
import skillRouter from "./routes/skillRouter.js";
import softwareApplicationRouter from "./routes/softwareApplicationRouter.js";
import projectRouter from "./routes/projectRouter.js";

const app = express();


// Load all environment variables from the .env file
dotenv.config();



app.use(
  cors({
    origin: ["https://vijay021.netlify.app", "https://vssdashboard.netlify.app"],  // Allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed methods
    credentials: true,  // Allow credentials (cookies)
  })
);

// Ensure headers for credentials are properly set
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");  // Set the credentials header to true
  next();
});




app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);
app.use("/api/v1/project", projectRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
