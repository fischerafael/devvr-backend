import UserService from '../services/user-service';

import { Request, Response } from 'express';

const UserController = {
	async create(req: Request, res: Response) {
		try {
			const body: IUserRequest = req.body;
			const { status, data } = await UserService.create(body);
			return res.status(status).json(data);
		} catch (err) {
			return res.status(500).json(err);
		}
	},
	async index(req: Request, res: Response) {
		try {
			const userId = req.headers.user_id as string;
			const { latitude, longitude, maxDistance } = req.query;
			const { status, data } = await UserService.index(
				userId,
				latitude as string,
				longitude as string,
				maxDistance as string
			);
			return res.status(status).json(data);
		} catch (err) {
			return res.status(500).json(err);
		}
	}
};

export default UserController;
