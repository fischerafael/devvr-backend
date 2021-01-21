import { Request, Response } from 'express';
import User from '../database/Models/User';
import { formatResponse } from '../helpers';

const DislikeController = {
	async create(req: Request, res: Response) {
		try {
			const userId = req.headers.user_id as string;
			const likedUserId = req.params.liked_user_id;
			const { status, data } = await DislikeService.create(
				userId,
				likedUserId
			);
			return res.status(status).json(data);
		} catch (err) {
			return res.status(500).json(err);
		}
	}
};

export default DislikeController;

const DislikeService = {
	async create(userId: string, likedUserId: string) {
		const user = await User.findById(userId);
		const dislikedUser = await User.findById(likedUserId);

		if (user === dislikedUser)
			return formatResponse(400, 'An user can not dislike itself');

		if (user.dislikes.includes(dislikedUser._id)) {
			return formatResponse(400, 'User already disliked');
		}

		user.dislikes.push(dislikedUser._id);

		if (user.likes.includes(dislikedUser._id)) {
			user.likes.pull(dislikedUser._id);
		}

		await user.save();

		return formatResponse(200, { user, dislikedUser });
	}
};
