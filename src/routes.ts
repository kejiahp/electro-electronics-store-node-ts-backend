import { Express, Request, Response } from "express"
import { createSessionController, deleteSessionController, getUserSessionController } from "./controllers/session-controller"
import { createUserController } from "./controllers/user-controller"
import { deserializeUser } from "./middleware/deserializeUser"
import { requireUser } from "./middleware/requireUser"
import { validateRequest } from "./middleware/validateRequest"
import { sessionSchema } from "./schemas/session-schema"
import { createUserSchema } from "./schemas/user-schema"

const routes = (app:Express) => {
    app.get("/", (req: Request, res: Response)=>{
        res.send(`<h1>IT IS WORKING</h1>`)
    })

    app.post("/api/users", validateRequest(createUserSchema), createUserController)

    app.post("/api/login", validateRequest(sessionSchema), createSessionController)

    app.get("/api/session", [deserializeUser,requireUser,getUserSessionController])

    app.delete('/api/session', [deserializeUser, requireUser, deleteSessionController])
}

export default routes