import { Request, Response } from "express";
import { ListMethodPaymentService } from "../../services/mtdo_pagto/ListMethodPaymentService";

class ListMethodPaymentController {
  async handle(req: Request, res: Response) {
    const listMethods = new ListMethodPaymentService();
    const methods = await listMethods.execute();
    return res.json(methods);
  }
}

export { ListMethodPaymentController };
