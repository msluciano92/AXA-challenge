const domain = 'http://localhost:3000'

const loadMovies = () => {
	return Promise.resolve(fetch(`${domain}/movies`)
		.then(response => {
			return response.json();
		})
		.then(movies => {
			return movies
		}));
}

const loadStudios = (data) => {
	return fetch(`${domain}/studios`)
		.then(response => {
			return response.json();
		})
		.then(studios => {
			return studios
		});
}

const transferMovie = (data) => {
	const { originStudioId, targetStudioId, movieId, img } = data;
	const fetchConfiguration = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			originStudioId,
			targetStudioId,
			movieId,
			img
		})
	}
	return fetch(`${domain}/movies`, fetchConfiguration)
		.then(() => {});
}

const CinemaService = {
	loadMovies,
	loadStudios,
	transferMovie,
}

export default CinemaService;
