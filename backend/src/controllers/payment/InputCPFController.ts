import { Request, Response } from "express";
import { InputCPFService } from "../../services/payment/InputCPFService";

class InputCPFController {
    async handle(req: Request, res: Response) {

        const { cpf, costumer_id } = req.body;

        const inputCPFService = new InputCPFService();

        try {
            const inputCPF = await inputCPFService.execute({ cpf, costumer_id });
            return res.json(inputCPF);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { InputCPFController };