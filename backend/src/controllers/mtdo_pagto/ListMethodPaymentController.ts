import e, { Request, Response } from "express";
import { ListMtdoPagtoService } from "../../services/mtdo_pagto/ListMethodPaymentService";

class ListMtdoPagtoController {
    async handle(req: Request, res: Response) {

        const listMtdoPagtoService = new ListMtdoPagtoService();

        const mtdoPagto = await listMtdoPagtoService.execute();

        res.json(mtdoPagto)
    }
}

export { ListMtdoPagtoController }