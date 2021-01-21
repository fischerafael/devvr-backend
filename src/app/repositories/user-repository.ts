import User from '../database/Models/User';

const UserRepository = {
	async findByName(name: string) {
		const user = await User.findOne({ username: name });
		return user;
	},
	async findById(id: string) {
		const user = await User.findById(id);
		return user;
	},
	async create(data: IUserData) {
		const user = await User.create(data);
		return user;
	},
	async findByMaxDistLocation(data: IfindByMaxDistLocation) {
		const {
			latitude,
			longitude,
			maxDistance,
			userId,
			userDislikes,
			userLikes
		} = data;
		const users = await User.find({
			location: {
				$near: {
					$geometry: {
						type: 'Point',
						coordinates: [longitude, latitude]
					},
					$maxDistance: parseInt(maxDistance)
				}
			}
		}).where({
			$and: [
				{ _id: { $ne: userId } },
				{ _id: { $nin: userDislikes } },
				{ _id: { $nin: userLikes } }
			]
		});
		return users;
	}
};

export default UserRepository;
