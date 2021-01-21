import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

export async function connectToDatabase() {
	if (MONGO_URL) {
		mongoose.connect(
			MONGO_URL,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			},
			() => console.log('Connected to MongoDB')
		);
	} else {
		console.log('Unable to connect to MongoDB');
	}
}
