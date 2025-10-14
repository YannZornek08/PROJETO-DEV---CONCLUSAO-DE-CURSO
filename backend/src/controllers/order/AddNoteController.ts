import { Request, Response } from "express";
import { AddNoteService } from "../../services/order/AddNoteService";

class AddNoteController {
    async handle(req: Request, res: Response) {
        const { order_id, note } = req.body;

        const addNote = new AddNoteService();

        const order = await addNote.execute({
            order_id,
            note
        });

        res.json(order)
    }
}

export { AddNoteController }