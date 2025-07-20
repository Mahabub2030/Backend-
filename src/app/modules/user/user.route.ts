import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();
// create or register router 
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);
// get all user router
router.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),

  UserControllers.getAllUsers
);
// update user router
router.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  UserControllers.updateUser
);
export const UserRoutes = router;
