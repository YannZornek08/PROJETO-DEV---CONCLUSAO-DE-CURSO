import { Request, Response } from "express";
import { CreateMtdoPagtoService } from "../../services/mtdo_pagto/CreateMethodPaymentService";

class CreateMtdoPagtoController {
    async handle(req: Request, res: Response) {

        const { name } = req.body;

        const createMtdoPagtoService = new CreateMtdoPagtoService();

        const mtdoPagto = await createMtdoPagtoService.execute({
            name
        });

        res.json(mtdoPagto)
    }
}

export { CreateMtdoPagtoController }
