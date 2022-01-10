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

const loadStudios = () => {
	return fetch(`${domain}/studios`)
		.then(response => {
			return response.json();
		})
		.then(studios => {
			return studios
		});
}

export default {
	loadMovies,
	loadStudios,
}
