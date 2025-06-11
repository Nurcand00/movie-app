import { apiKey } from "../constants/data";
import axios from "axios";

//endpoints
const baseUrl = "https://api.themoviedb.org/3";
const trendingMoviesUrl = `${baseUrl}/trending/movie/day?language=en-US`;
const upcomingMoviesUrl = `${baseUrl}/movie/upcoming`;
const topRatedMoviesUrl = `${baseUrl}/movie/top_rated`;
const searchMoviesEndpoint = `${baseUrl}/search/movie`;

//dynamic endpoints
const movieDetailsEndpoint = (id: string) => `${baseUrl}/movie/${id}`;
const movieCreditsEndpoint = (id: string) => `${baseUrl}/movie/${id}/credits`;
const similarMoviesEndpoint = (id: string) => `${baseUrl}/movie/${id}/similar`;

const personDetailsEndpoint = (id: string) => `${baseUrl}/person/${id}`;
const personMoviesEndpoint = (id: string) =>
	`${baseUrl}/person/${id}/movie_credits`;

export const image500 = (path: string) =>
	path ? `https://image.tmdb.org/t/p/w500${path}` : undefined;

export const image342 = (path: string) =>
	path ? `https://image.tmdb.org/t/p/w342${path}` : undefined;

export const image185 = (path: string) =>
	path ? `https://image.tmdb.org/t/p/w185${path}` : undefined;

export const fallbackMoviePoster =
	"https://www.themoviedb.org/t/p/w500/8uO0c1d2k3j4k5l6m7n8o9p0q1r2s3t4.jpg";
export const fallbackPersonImage =
	"https://www.themoviedb.org/t/p/w500/8uO0c1d2k3j4k5l6m7n8o9p0q1r2s3t4.jpg";

const apiCall = async (endpoint: any, params?: any) => {
	const options = {
		url: endpoint,
		method: "GET",
		params: params,
		headers: {
			Authorization: `Bearer ${apiKey}`,
			accept: "application/json",
		},
	};

	try {
		const data = await axios.post("http://localhost:3002/tmdb", options);
		console.log("DATA", data);

		return data.data;
	} catch (error) {
		console.log("error:", error);
		return {};
	}
};

export const fetchTrendingMovies = () => {
	return apiCall(trendingMoviesUrl);
};

export const fetchUpcomingMovies = () => {
	return apiCall(upcomingMoviesUrl);
};

export const fetchTopRatedMovies = () => {
	return apiCall(topRatedMoviesUrl);
};

export const fetchMovieDetails = (id: string) => {
	return apiCall(movieDetailsEndpoint(id));
};
export const fetchMovieCredits = (id: string) => {
	return apiCall(movieCreditsEndpoint(id));
};
export const fetchSimilarMovies = (id: string) => {
	return apiCall(similarMoviesEndpoint(id));
};

export const fetchPersonDetails = (id: string) => {
	return apiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = (id: string) => {
	return apiCall(personMoviesEndpoint(id));
};

export const searchMovies = (params: any) => {
	return apiCall(searchMoviesEndpoint, params);
};
