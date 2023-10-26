import { Request,Response } from "express";

class UsersControllers {

    //List all users
    async searchAllUsers(_req: Request, res: Response):Promise<Response> {
        const users = [
            {id: '456', email: 'Jhon@example.com'},
        ]

        return res.status(200).json(users)
    }
}

export default new UsersControllers()
