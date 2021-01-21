import axios from 'axios';

export function formatResponse(status: number, data?: any) {
	return {
		status,
		data
	};
}

export function stringToArray(string: string) {
	if (!string) return [];
	const rawStringArray = string.split(',');
	const sanitizedArray = rawStringArray.map((string) => string.trim());
	return sanitizedArray;
}

export async function getUserGitHubAvatar(user: string) {
	const defaultAvatar =
		'https://www.construtoracesconetto.com.br/wp-content/uploads/2020/03/blank-profile-picture-973460_640.png';

	try {
		const response = await axios.get(
			`https://api.github.com/users/${user}`
		);
		console.log(response);
		const { avatar_url } = response.data;

		if (!avatar_url) return defaultAvatar;

		return avatar_url as string;
	} catch (err) {
		return defaultAvatar as string;
	}
}
