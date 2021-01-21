import { Request, Response } from 'express';
import User from '../database/Models/User';
import { formatResponse } from '../helpers';

const LikeController = {
	async create(req: Request, res: Response) {
		try {
			const userId = req.headers.user_id as string;
			const likedUserId = req.params.liked_user_id;
			const { status, data } = await LikeService.create(
				userId,
				likedUserId
			);
			return res.status(status).json(data);
		} catch (err) {
			return res.status(500).json(err);
		}
	}
};

export default LikeController;

const LikeService = {
	async create(userId: string, likedUserId: string) {
		const user = await User.findById(userId);
		const likedUser = await User.findById(likedUserId);

		if (user === likedUser)
			return formatResponse(400, 'An user can not like itself');

		if (user.likes.includes(likedUser._id)) {
			return formatResponse(400, 'User already liked');
		}

		user.likes.push(likedUser._id);

		if (user.dislikes.includes(likedUser._id)) {
			user.dislikes.pull(likedUser._id);
		}

		await user.save();

		return formatResponse(200, { user, likedUser });
	}
};
