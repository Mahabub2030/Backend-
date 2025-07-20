import { Router } from "express";
import { UserRoutes } from "../app/modules/user/user.route";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import { DivisionRoutes } from "../app/modules/division/division.route";
import { TourRoutes } from "../app/modules/tour/tour.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/user",
    router: UserRoutes,
  },
  {
    path: "/auth",
    router: AuthRoutes,
  },
  {
    path: "/division",
    router: DivisionRoutes,
  },
  {
    path: "/tour",
    router: TourRoutes,
  },
];
modulesRoutes.forEach((route) => {
    router.use(route.path, route.router)
})

export default router;
