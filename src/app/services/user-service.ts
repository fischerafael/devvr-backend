import UserRepository from '../repositories/user-repository';

import { setLocationData } from '../controllers/helpers';
import { formatResponse, getUserGitHubAvatar, stringToArray } from '../helpers';

const UserService = {
	async create(user: IUserRequest) {
		const { username, password, tech, latitude, longitude } = user;

		const techArray = stringToArray(tech);

		const thumbnail = await getUserGitHubAvatar(username);

		const userData: IUserData = {
			username,
			password,
			tech: techArray,
			location: setLocationData(longitude, latitude),
			thumbnail
		};

		const hasUser = await UserRepository.findByName(username);

		if (hasUser) return formatResponse(409, 'User already exists');

		const createdUser = await UserRepository.create(userData);

		return formatResponse(201, createdUser);
	},
	async index(
		userId: string,
		latitude: string,
		longitude: string,
		maxDistance: string
	) {
		const user = await UserRepository.findById(userId);

		const userLikes = user.likes;
		const userDislikes = user.dislikes;

		const users = await UserRepository.findByMaxDistLocation({
			latitude,
			longitude,
			maxDistance,
			userId,
			userLikes,
			userDislikes
		});

		return formatResponse(200, users);
	}
};

export default UserService;
