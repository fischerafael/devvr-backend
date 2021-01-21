import { Request, Response } from 'express';
import User from '../database/Models/User';
import { formatResponse } from '../helpers';

interface ISessionBody {
	username: string;
	password: string;
}

const SessionController = {
	async create(req: Request, res: Response) {
		const body: ISessionBody = req.body;
		const { status, data } = await SessionService.create(
			body.username,
			body.password
		);
		return res.status(status).json(data);
	}
};

export default SessionController;

const SessionService = {
	async create(username: string, password: string) {
		const user = await User.findOne({ username }).where({ password });
		if (!user) return formatResponse(403, 'Failed to login');
		return formatResponse(200, user);
	}
};
