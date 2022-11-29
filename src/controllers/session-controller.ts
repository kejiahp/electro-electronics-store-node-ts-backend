import { Request, Response } from "express";
import config from "config";
import { sessionSchemaInput } from "../schemas/session-schema";
import { createSessionService, getUserSessionService } from "../services/session-service";
import { validateLoginCredentials } from "../services/user-service";
import { signJwt } from "../utils/jwt-utils";


export const createSessionController = async (req: Request<{}, {}, sessionSchemaInput["body"]>, res: Response) => {
    const { email, password } = req.body

    //Login user so as to create session
    const user = await validateLoginCredentials({ email, password })

    if(!user) {
        return res.status(401).send("Invalid Credentials")
    }

    //creating session for logged in user
    const session = await createSessionService({userId:user._id, userAgent: req.get("user-agent") || ""})

    if(!session) {
        return res.status(500).send("Cannot Create Session")
    }


    //accessToken
    const accessToken = signJwt({...user, session: session._id}, {expiresIn: config.get<string>("accessTokenTtl")})
    
    const refreshToken = signJwt({...user, session: session._id}, {expiresIn: config.get<string>("refreshTokenTtl")})

    return res.status(200).send({accessToken, refreshToken})
}

export const getUserSessionController = async (req: Request, res: Response) => {
    const userId = res.locals.user._id
    const session = await getUserSessionService(userId)

    if(!session) {
        return res.status(404).send("no session found")
    }

    return res.status(200).send(session)
}