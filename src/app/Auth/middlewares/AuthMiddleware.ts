import { NextFunction, Request, Response } from "express";
import AuthService from "@app/Auth/services/AuthServices";
import AuthError from "@app/Auth/exceptions/AuthError";

export default async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    //If user doesn't send a token
    if(!authHeader) return res.status(401).json({ error: 'No token provided' })

    const[, token] = authHeader.split(' ')

    // Verify if token is valid
    try {
        const id = await new AuthService().validateToken(token)

        req.user = { id, token }

        return next()
    } catch (error) {
        if( error instanceof AuthError) {
            return res.status(401).send()
        }

        return res.status(500).json( {error} )
    }
}
