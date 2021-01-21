export function setLocationData(longitude: number, latitude: number) {
	return {
		type: 'Point',
		coordinates: [longitude, latitude]
	};
}
