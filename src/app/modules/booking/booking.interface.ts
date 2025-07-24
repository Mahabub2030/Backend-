import { Types } from "mongoose";

export enum BOOKING_STATUS {
    PENDING = "PENDING",
    CANCEL = "CANCEL",
    COMPLETE = "COMPLETE",
    FAILED = "FAILED"
}


export interface IBooking{
    user:Types.ObjectId,
    tour:Types.ObjectId,
    payment?:Types.ObjectId,
    status: BOOKING_STATUS,
     guestCount: number;
}