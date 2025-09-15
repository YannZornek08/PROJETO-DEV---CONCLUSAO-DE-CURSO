import { Request, Response } from "express"
import { AuthCostumerService } from "../../services/costumer/AuthCostumerService"

class AuthCostumerController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const authCostumerService = new AuthCostumerService()

        const auth = await authCostumerService.execute({
            email,
            password
        })

        res.json(auth)

    }
}

export { AuthCostumerController }