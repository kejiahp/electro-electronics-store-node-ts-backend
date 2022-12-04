import { Express, Request, Response } from "express"
import { createAddressController, getAddressController, updateAddressController } from "./controllers/address-controller"
import { addCategoryController, getCategoriesController } from "./controllers/category-controller"
import { createProductController, deleteProductController, getAllProductController, getProductController, updateProductController } from "./controllers/product-controller"
import { createSessionController, deleteSessionController, getUserSessionController } from "./controllers/session-controller"
import { createUserController } from "./controllers/user-controller"
import { deserializeUser } from "./middleware/deserializeUser"
import { requireUser } from "./middleware/requireUser"
import { validateRequest } from "./middleware/validateRequest"
import { AddressSchema } from "./schemas/address-schema"
import { categorySchema } from "./schemas/category-schema"
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schemas/product-schema"
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

    //get all categories route
    app.get('/api/category', getCategoriesController)

    //create product
    app.post('/api/product', [deserializeUser, requireUser, validateRequest(createProductSchema), createProductController])
    
    //get all products
    app.get('/api/product', getAllProductController)

    //get single product
    app.get('/api/product/:productId', validateRequest(getProductSchema),getProductController)

    //update single product
    app.patch('/api/product/:productId', [deserializeUser, requireUser, validateRequest(updateProductSchema), updateProductController])

    //delete product
    app.delete('/api/product/:productId', [deserializeUser, requireUser, validateRequest(deleteProductSchema),deleteProductController])

    //ADDRESS ROUTES
    app.get('/api/address', [deserializeUser, requireUser, getAddressController])

    app.post('/api/address', [deserializeUser, requireUser, validateRequest(AddressSchema), createAddressController])

    app.patch('/api/address', [deserializeUser, requireUser, updateAddressController])
}

export default routes