import mongoose from 'mongoose';

interface IPointSchema extends mongoose.Document {
	type: string;
	coordiantes: number[];
}

const PointSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['Point'],
		required: true
	},
	coordinates: {
		type: [Number],
		required: true
	}
});

interface IUserModel extends mongoose.Document {
	username: string;
	password: string;
	tech: string[];
	location: IPointSchema;
	likes: string[];
	dislikes: string[];
	thumbnail: string;
}

const Schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	tech: [String],
	location: {
		type: PointSchema,
		index: '2dsphere'
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	dislikes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	thumbnail: {
		type: String,
		required: true
	}
});

export default mongoose.model<IUserModel>('User', Schema);
