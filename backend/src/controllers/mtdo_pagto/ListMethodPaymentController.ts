import { Request, Response } from "express";
import { ListMethodPaymentService } from "../../services/mtdo_pagto/ListMethodPaymentService";

class ListMtdoPagtoController {
    async handle(req: Request, res: Response) {

        const listMtdoPagtoService = new ListMethodPaymentService();

        const mtdoPagto = await listMtdoPagtoService.execute();

        res.json(mtdoPagto)
    }
}

export { ListMtdoPagtoController }