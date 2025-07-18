import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { Role } from "./user.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);
router.get(
  "/all-users",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      const verifyToken = jwt.verify(accessToken, "secret");
      
      if (!accessToken) {
        throw new AppError(403, "No Token Recive");
      }
      if (!verifyToken) {
        throw new AppError(403, `you no have permt${verifyToken}`);
        console.log(verifyToken);
      }

      if ((verifyToken as JwtPayload).role !== Role.ADMIN || Role.SUPER_ADMIN) {
        throw new AppError(403, "you no have permt");
      }
      console.log(verifyToken);
      next();
    } catch (error) {
      next(error);
    }
  },
  UserControllers.getAllUsers
);

// /api/v1/user/:id
export const UserRoutes = router;
