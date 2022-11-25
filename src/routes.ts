import { Express, Request, Response } from "express"
import { createSessionController } from "./controllers/session-controller"
import { createUserController } from "./controllers/user-controller"
import { validateRequest } from "./middleware/validateRequest"
import { sessionSchema } from "./schemas/session-schema"
import { createUserSchema } from "./schemas/user-schema"

const routes = (app:Express) => {
    app.get("/", (req: Request, res: Response)=>{
        res.send(`<h1>IT IS WORKING</h1>`)
    })

    app.post("/api/users", validateRequest(createUserSchema), createUserController)

    app.post("/api/login", validateRequest(sessionSchema), createSessionController)
}

export default routes