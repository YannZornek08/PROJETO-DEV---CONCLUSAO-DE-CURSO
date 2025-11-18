import { Request, Response } from "express";
import { InputCPFService } from "../../services/payment/InputCPFService";

class InputCPFController {
    async handle(req: Request, res: Response) {

        const { cpf, costumer_id } = req.body;

        const inputCPFService = new InputCPFService();

        const inputCPF = await inputCPFService.execute({
            cpf,

            costumer_id
        });

        res.json(inputCPF);
    }
}

export { InputCPFController };