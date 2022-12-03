import { Express, Request, Response } from "express"
import { addCategoryController } from "./controllers/category-controller"
import { createProductController } from "./controllers/product-controller"
import { createSessionController, deleteSessionController, getUserSessionController } from "./controllers/session-controller"
import { createUserController } from "./controllers/user-controller"
import { deserializeUser } from "./middleware/deserializeUser"
import { requireUser } from "./middleware/requireUser"
import { validateRequest } from "./middleware/validateRequest"
import { categorySchema } from "./schemas/category-schema"
import { createProductSchema } from "./schemas/product-schema"
import { sessionSchema } from "./schemas/session-schema"
import { createUserSchema } from "./schemas/user-schema"

const routes = (app:Express) => {
    app.get("/", (req: Request, res: Response)=>{
        res.send(`<h1>IT IS WORKING</h1>`)
    })
    //USERS ROUTES
    //create user route
    app.post("/api/users", validateRequest(createUserSchema), createUserController)

    //login user or create user session route
    app.post("/api/login", validateRequest(sessionSchema), createSessionController)

    //get users valid sessions
    app.get("/api/session", [deserializeUser,requireUser,getUserSessionController])

    //delete users or invalidate users valid sessions
    app.delete('/api/session', [deserializeUser, requireUser, deleteSessionController])

    //PRODUCT ROUTES
    //create product category
    app.post('/api/category', [deserializeUser, requireUser, validateRequest(categorySchema), addCategoryController])
    //create product
    // app.post('/api/product', [deserializeUser, requireUser, validateRequest(createProductSchema), createProductController])
    app.post('/api/product', [validateRequest(createProductSchema), createProductController])
}

export default routes