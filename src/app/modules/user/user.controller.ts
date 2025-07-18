/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import AppError from "../../errorHelpers/AppError";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync( async(req: Request, res: Response, next: NextFunction)=>{
    const user = await UserServices.createUser(req.body)

    res.status(httpStatus.CREATED).json({
        message:"USER CREATE SUCESSFULLY",
        user
    })

})
const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const token = req.headers.authorization

    const verifiedToken = req.user;

    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifiedToken as JwtPayload)

    

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Updated Successfully",
        data: user,
    })
})


const getAllUsers = catchAsync( async(req: Request, res: Response, next: NextFunction)=>{
    const reuslt = await UserServices.getAllUsers()

    // res.status(httpStatus.OK).json({
    //     sucess:true,
    //     message:"USER GET READWRITH SUCESSFULLY",
    //     user
    // })
    sendResponse(res,{
        success:true,
        statusCode:(httpStatus.OK),
        message:"USER all GET READWRITH SUCESSFULLY FROM RESPONS ",
       data:reuslt.data,
       meta:reuslt.meta
    })

})

// function => try-catch catch => req-res function

export const UserControllers = {
  createUser,
  getAllUsers,updateUser
};

// route matching -> controller -> service -> model -> DB
