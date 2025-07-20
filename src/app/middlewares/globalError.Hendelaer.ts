/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";

export const globalErrorHandeler = (


  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {

  console.log(err)
  let statusCode = 500;

  let message = "Something went wrong from gobal error";
// dulicate Error
if (err.code === 11000) {
  console.log('Duplicate Error', err.message);
  const matchedArray = err.message?.match(/"([^"]*)"/);
  message = `${matchedArray[1]} alredy exitsts!!`;
  statusCode = 400;
  // objectID Error cush Error
} else if(err.name === "CastError"){
  statusCode =400
  message="Invalid MongoDb Id,Please check"
}
// Zode Error

 


    //Mongoose Validation Error
else if (err.name === "ValidationError") {
  statusCode = 400;
  const errors = Object.values(err.errors);
  console.log(errors)
  message = "Validation erro";
}


 else if(err instanceof AppError){
    statusCode = err.statusCode
    message = err.message
  } else if (err instanceof Error){
    statusCode = 500;
    message = err.message
  }

  res.status(statusCode).json({
    success: false,
    message ,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
