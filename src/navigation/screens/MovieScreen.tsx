import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
	View,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Dimensions,
	Platform,
	Image,
	Text,
} from "react-native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import Cast from "../../Component/Cast";
import MovieList from "../../Component/MovieList";
import Loading from "../../Component/Loading";
import {
	fallbackMoviePoster,
	fetchMovieCredits,
	fetchMovieDetails,
	fetchSimilarMovies,
	image500,
} from "../../api/Moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";

const MovieScreen = () => {
	const { params: { movie: item } = {} } = useRoute(); //diğer sayfadan nasıl aldığına iyi bak parametreyi yoksa imgler gelmez.
	const [favorite, setFavorite] = useState(false);
	const navigation = useNavigation();
	const [cast, setCast] = useState([]);
	const [similarMovies, setSimilarMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [movie, setMovie] = useState({});
	const movieName = "Ant-Man and the Wasp: Quantumania";

	useEffect(() => {
		//console.log("itemid:", item.id);
		setLoading(true);
		getMovieDetails(item.id);
		getMovieCredits(item.id);
		getSimilarMovies(item.id);
	}, [item]);

	const getMovieDetails = async (id: string) => {
		const data = await fetchMovieDetails(id);
		//console.log("Movie Details: ", data);
		if (data) setMovie(data);
		setLoading(false);
	};

	const getMovieCredits = async (id: string) => {
		const data = await fetchMovieCredits(id);
		//console.log("Movie Credits: ", data);
		if (data && data.cast) setCast(data.cast);
	};

	const getSimilarMovies = async (id: string) => {
		const data = await fetchSimilarMovies(id);
		//console.log("Movie Similar:", data);
		if (data && data.results) setSimilarMovies(data.results); //terminalde ne döndüğü yazıyor
	};

	return (
		<ScrollView
			contentContainerStyle={{ paddingBottom: 20 }}
			className="flex-1 bg-neutral-900 "
		>
			{/*Go back button */}
			<View className="w-full  ">
				<SafeAreaView
					className={
						" absolute z-20 w-full flex-row justify-between items-center px-4 " +
						topMargin
					}
				>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						className="bg-yellow-600 rounded-xl p-1 mx-4"
					>
						<ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
					</TouchableOpacity>

					<TouchableOpacity
						className="mr-5"
						onPress={() => setFavorite(!favorite)}
					>
						<HeartIcon size="35" color={favorite ? "#facc15" : "white"} />
					</TouchableOpacity>
				</SafeAreaView>

				{loading ? ( //Sayfa yüklenirken loading gösterilecek
					<Loading />
				) : (
					<View>
						<Image
							//source={require("../../assets/antman.png")}
							source={{
								uri: image500(movie?.poster_path) || fallbackMoviePoster,
							}}
							style={{ width, height: height * 0.55 }}
						/>

						<LinearGradient
							colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
							style={{
								width,
								height: height * 0.4,
								position: "absolute", //gradıentte className kullanamıyoruz
								bottom: 0,
							}}
							start={{ x: 0.5, y: 0 }}
							end={{ x: 0.5, y: 1 }}
						/>
					</View>
				)}
			</View>

			{/* Movie Details  (mt ile yeteri kadar yazı yukarı cıkmıyor o yuzden style kullandık) */}
			<View className="space-y-3" style={{ marginTop: -(height * 0.09) }}>
				<Text className="text-white text-center text-3xl font-bold tracking-wider">
					{movie?.title}
				</Text>

				{movie?.id ? (
					<Text className=" text-neutral-400 font-semibold text-base text-center mt-3">
						{movie?.status} • {movie?.release_date?.split("-")[0]} •
						{movie?.runtime} min
					</Text>
				) : null}

				<View className="flex-row justify-center mx-4 gap-2">
					{movie?.genres?.map((genre, index) => {
						let showDot = index + 1 != movie.genres.length; //son eleman için nokta gösterme!
						return (
							<Text
								key={index}
								className="text-neutral-400 font-semibold text-base text-center mt-3"
							>
								{genre?.name} {showDot ? "•" : null}
							</Text>
						);
					})}
					{/*
					<Text className="text-neutral-400 font-semibold text-base text-center mt-3">
						Action •
					</Text>
					<Text className="text-neutral-400 font-semibold text-base text-center mt-3">
						Thrill •
					</Text>
					<Text className="text-neutral-400 font-semibold text-base text-center mt-3">
						Comedy • 
					</Text>
					*/}
				</View>
				{/*Description */}
				<Text className="text-neutral-400 tracking-wide m-3">
					{movie?.overview}
				</Text>
			</View>
			{/*Cast */}
			{cast.length > 0 && <Cast navigation={navigation} cast={cast} />}
			{similarMovies.length > 0 && (
				<MovieList
					title="Similar Movies"
					hideSeeAll={true}
					data={similarMovies}
				/>
			)}
		</ScrollView>
	);
};

export default MovieScreen;
function getMovieCredits(id: any) {
	throw new Error("Function not implemented.");
}
