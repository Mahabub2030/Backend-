import { Router } from "express";
import { UserRoutes } from "../app/modules/user/user.route";
import { AuthRoutes } from "../app/modules/auth/auth.route";

const router = Router()

const modulesRoutes = [
    {
        path:"/user",
        router:UserRoutes
    },
    {
        path:"/auth",
        router:AuthRoutes
    },
]
modulesRoutes.forEach((route)=>{
    router.use(route.path, route.router)
})

export default router;
