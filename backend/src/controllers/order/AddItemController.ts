import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";

class AddItemController {
    async handle(req: Request, res: Response) {
        const { order_id, product_id, items_ingredients_id, items_additionals_id, amount, note} = req.body;

    const addItem = new AddItemService();

    const order = await addItem.execute({
        order_id,
        product_id,
        items_ingredients_id, 
        items_additionals_id,
        amount,
        note
    });

        res.json(order)
}
}

export { AddItemController }