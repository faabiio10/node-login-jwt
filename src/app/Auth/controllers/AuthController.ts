import { Request, Response } from 'express'

import AuthService from '@/app/Auth/services/AuthServices'
import AuthError from '../exceptions/AuthError'

class AuthController {

    //CSend credentials to create a new token
    async create( req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body

        try {
            const authService = new AuthService()
            const{ user, token } = await authService.signIn(email, password)

            return res.status(200).json({ user, token })
        } catch (error) {
            if( error instanceof AuthError) return res.status(401).send()

            return res.status(500).json( {error} )
        }
    }

    //Add token to blacklist
    async destroy( req: Request, res: Response): Promise<Response> {
        req.user.id && new AuthService().signOut(req.user.token)

        return res.status(204).send()
    }
}

export default new AuthController()
