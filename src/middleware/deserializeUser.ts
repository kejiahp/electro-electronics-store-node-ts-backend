import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../services/session-service";
import { verifyJwt } from "../utils/jwt-utils";

export const deserializeUser = async (req: Request, res: Response, next:NextFunction) => {
    const authorization = get(req,"headers.authorization", "").replace(/^Bearer\s/,"")

    const refreshToken = get(req, "headers.x-refresh") as string

    if(!authorization) {
        // return res.status(401).send("unauthorized user")
        return next()
    }

    const verified = verifyJwt(authorization)
    

    const { decoded, expired, valid } = verified

    if(decoded) {
        res.locals.user = decoded
        return next()
    }

    //If the accessToken as expired and there is a refresh token uses the details of the refreshToken to create a new access token, verfiy the new one and grant the unauthorization
    if(refreshToken && expired){
        const newAccessToken = await reIssueAccessToken(refreshToken)
        // console.log("newAccessToken",newAccessToken)
        

        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken)

            const {decoded} = verifyJwt(newAccessToken)
            
        
            res.locals.user = decoded
            return next()
        }
    }

    return next()
}