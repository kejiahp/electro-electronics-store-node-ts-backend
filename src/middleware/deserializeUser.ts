import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt-utils";

export const deserializeUser = (req: Request, res: Response, next:NextFunction) => {
    const authorization = get(req,"headers.authorization", "").replace(/^Bearer\s/,"")

    if(!authorization) {
        // return res.status(401).send("unauthorized user")
        return next()
    }

    const verified = verifyJwt(authorization)
    

    const { decoded, expired, valid } = verified

    if(!decoded) {
        return next()
    }
    res.locals.user = decoded
    return next()
}