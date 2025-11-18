import { Request, Response } from 'express';
import { UpdateStatusItemService } from '../../services/order/UpdateStatusItemService';

class UpdateStatusItemController {
	async handle(req: Request, res: Response) {
		const { item_id, status } = req.body;

		const updateStatusItemService = new UpdateStatusItemService();

		try {
			const item = await updateStatusItemService.execute({ item_id, status });
			res.json(item);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}
}

export { UpdateStatusItemController };

