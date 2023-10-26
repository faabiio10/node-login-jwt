import { Router } from "express";

import authRotes from '@app/Auth/routes'
import usersRoutes from '@app/Users/routes'

const routes = Router()

routes.use(authRotes)
routes.use(usersRoutes)

export default routes
