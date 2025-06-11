import React, { useEffect, useState } from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
	Bars3CenterLeftIcon,
	MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { ScrollView } from "react-native";
import TrendingMovies from "../../Component/TrendingMovies";
import MovieList from "../../Component/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../Component/Loading";
import {
	fetchTopRatedMovies,
	fetchTrendingMovies,
	fetchUpcomingMovies,
} from "../../api/Moviedb";

const ios = Platform.OS == "ios";

type TrendingMoviesProps = {
	data: any[];
};

const HomeScreen: React.FC<TrendingMoviesProps> = () => {
	const [trending, setTrending] = useState([]); //tüm stateler 1,2,3 idi dinamik yapınca sildik filmlerin kendi isimleri gelmesi gerekıyordu.
	const [upcoming, setUpcoming] = useState([]);
	const [topRated, setTopRated] = useState([]);
	const [loading, setLoading] = useState(true); //false idi getTrendingMovies içinde true false eyapıldıgı ıcın burası true oldu
	const navigation = useNavigation();

	useEffect(() => {
		getTrendingMovies();
		getUpcomingMovies();
		getTopRatedMovies();
	}, []);

	const getTrendingMovies = async () => {
		const data = await fetchTrendingMovies();
		console.log("Trending Movies: ", data);
		if (data && data.results) setTrending(data.results);
		setLoading(false);
	};
	const getUpcomingMovies = async () => {
		const data = await fetchUpcomingMovies();
		console.log("Upcoming Movies: ", data);
		if (data && data.results) setUpcoming(data.results);
		setLoading(false);
	};
	const getTopRatedMovies = async () => {
		const data = await fetchTopRatedMovies();
		console.log("Toprated Movies: ", data);
		if (data && data.results) setTopRated(data.results);
		setLoading(false);
	};

	return (
		<View className="flex-1  bg-neutral-800">
			<SafeAreaView className={ios ? "-mb-2" : " mb-3"}>
				<StatusBar style="light" />
				<View className="flex-row justify-between items-center mx-4">
					<Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
					<Text className="text-white text-3xl font-bold">
						<Text className="text-amber-400">M</Text>ovies
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate("Search")}>
						<MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
					</TouchableOpacity>
				</View>
			</SafeAreaView>

			{loading ? ( //ekran açılırken loading gösterilecek
				<Loading />
			) : (
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 10 }}
				>
					{trending.length > 0 && <TrendingMovies data={trending} />}
					<MovieList title="Upcoming" data={upcoming} />
					<MovieList title="Top Rated" data={topRated} />
				</ScrollView>
			)}
		</View>
	);
};

export default HomeScreen;
