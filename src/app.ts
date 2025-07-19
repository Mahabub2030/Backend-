/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./router";
import { globalErrorHandeler } from "./app/middlewares/globalError.Hendelaer";

import httpStatus from "http-status-codes";
import cookieParser from "cookie-parser"
import passport  from "passport";
import expressSession from "express-session"


const app = express();

app.use(expressSession({
  secret:"My scret",
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.json());
app.use(cors());

app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
  res.status(201).json({
    message: "welcom to server for tour backend ",
  });
});



app.use(globalErrorHandeler)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req:Request,res:Response, next:NextFunction ) =>{
  res.status(httpStatus.NOT_FOUND).json({
    success:false,
    message:"Route Not Founds"
  })
})


export default app;
