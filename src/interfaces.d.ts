interface IUserRequest {
	username: string;
	password: string;
	tech: string;
	longitude: number;
	latitude: number;
}

interface IUserData {
	username: string;
	password: string;
	tech: string[];
	location: {
		type: string;
		coordinates: number[];
	};
	thumbnail: string;
}

interface IfindByMaxDistLocation {
	longitude: number;
	latitude: number;
	maxDistance: string;
	userId: string;
	userLikes: string[];
	userDislikes: string[];
}
