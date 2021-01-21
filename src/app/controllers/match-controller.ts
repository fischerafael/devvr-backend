import axios from 'axios';
import { Request, Response } from 'express';
import User from '../database/Models/User';
import { formatResponse } from '../helpers';

const MatchController = {
	async index(req: Request, res: Response) {
		try {
			const userId = req.headers.user_id as string;
			const { status, data } = await MatchService.index(userId);
			res.status(status).json(data);
		} catch (err) {
			res.status(500).json(err);
		}
	}
};

export default MatchController;

const MatchService = {
	async index(userId: string) {
		const user = await User.findById(userId);
		const userLikes = user.likes;

		const users = await User.find({ _id: { $in: userLikes } });

		const matches = users.filter((user: any) =>
			user.likes.includes(userId)
		);

		return formatResponse(200, matches);
	}
};
