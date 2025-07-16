import {
	View,
	Text,
	Dimensions,
	Platform,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Image,
} from "react-native";

import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import MovieList from "../../Component/MovieList";
import Loading from "../../Component/Loading";
import {
	fallbackPersonImage,
	fetchPersonDetails,
	fetchPersonMovies,
	image342,
} from "../../api/Moviedb";

interface Personprops {
	name: string;
	place_of_birth?: string;
	gender?: number;
	birthday?: string;
	known_for_department?: string;
	popularity?: number;
	biography?: string;
	profile_path?: string;
}

interface Movie {
	id: number;
	title?: string;
	poster_path?: string;
	// Gerekirse daha fazla alan eklenebilir
}

export interface PersonParam {
	id: string;
	profile_path?: string;
}

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

const PersonScreen = () => {
	const {
		params: { person },
	} = useRoute() as {
		params: {
			person: PersonParam;
		};
	};

	const navigation = useNavigation();
	const [favorite, setFavorite] = useState<Boolean>(false);
	const [personMovies, setPersonMovies] = useState<Movie[]>([]);
	const [persons, setPersons] = useState<Personprops | null>(null);
	const [loading, setLoading] = useState<Boolean>(false);

	useEffect(() => {
		setLoading(true);
		//console.log("person:", person);
		getPersonDetails(person.id);
		getPersonMovies(person.id);
	}, [person]);

	const getPersonDetails = async (id: string) => {
		const data = await fetchPersonDetails(id);
		//console.log("got person details:", data);
		if (data) setPersons(data);
		setLoading(false);
	};

	const getPersonMovies = async (id: string) => {
		const data = await fetchPersonMovies(id);
		console.log("got person Movies:", data);
		if (data && data.cast) setPersonMovies(data && data.cast);
		setLoading(false);
	};
	return (
		<ScrollView
			className="flex-1 bg-neutral-900 "
			contentContainerStyle={{ paddingBottom: 20 }}
		>
			<SafeAreaView
				className={
					"  z-20 w-full flex-row justify-between items-center px-4 " +
					verticalMargin
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

			{/*Person details */}
			{loading ? (
				<Loading />
			) : (
				<View>
					<View
						className="justify-center flex-row"
						style={{
							shadowColor: "gray",
							shadowRadius: 40,
							shadowOffset: { width: 0, height: 5 },
							shadowOpacity: 1,
						}}
					>
						<View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
							<Image
								//source={require("../../assets/keanu.png")}
								source={{
									uri: image342(person?.profile_path) || fallbackPersonImage,
								}}
								style={{ height: height * 0.43, width: width * 0.74 }}
							/>
						</View>
					</View>
					<View className="mt-6">
						<Text className="text-white text-center font-bold text-3xl ">
							{persons?.name}
						</Text>
						<Text className="text-base text-neutral-500 text-center">
							{persons?.place_of_birth}
						</Text>
					</View>
					<View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 border border-neutral-700 rounded-full">
						<View className="border-r-2 border-r-neutral-400 px-2 items-center">
							<Text className="text-white font-semibold">Gender</Text>
							<Text className=" text-neutral-300 text-sm">
								{persons?.gender == 1 ? "Female" : "Male"}
							</Text>
						</View>
						<View className="border-r-2 border-r-neutral-400 px-2 items-center">
							<Text className="text-white font-semibold">Birthday</Text>
							<Text className=" text-neutral-300 text-sm">
								{persons?.birthday}
							</Text>
						</View>
						<View className="border-r-2 border-r-neutral-400 px-2 items-center">
							<Text className="text-white font-semibold">Known for</Text>
							<Text className=" text-neutral-300 text-sm">
								{persons?.known_for_department}
							</Text>
						</View>
						<View className=" px-2 items-center">
							<Text className="text-white font-semibold">Popularity</Text>
							<Text className=" text-neutral-300 text-sm">
								{persons?.popularity?.toFixed(2)}%
							</Text>
						</View>
					</View>
					<View className="my-6 mx-4 space-y-2">
						<Text className="text-white text-lg">Biography</Text>
						<Text className="text-neutral-400 tracking-wide ">
							{persons?.biography || "N/A"}
							{/*Keanu Charles Reeves is a Canadian actor. Born in Beirut, Lebanon,
							and raised in Toronto, Canada, Reeves began acting in theatre
							productions and television movies before making his feature film
							debut in Youngblood (1986). He gained fame for his starring role
							in the science fiction comedy Bill & Ted's Excellent Adventure
							(1989) and its sequel, Bill & Ted's Bogus Journey (1991). His
							career reached new heights in the 1990s with critically and
							commercially successful films such as Point Break (1991) and the
							action thriller Speed (1994). However, it was his role as Neo in
							the groundbreaking science fiction trilogy The Matrix (1999–2003)
							that cemented his status as a global icon. In later years, Reeves
							revitalized his career with the John Wick series (2014–present),
							where he plays a legendary assassin seeking vengeance. Known for
							his humility, generosity, and versatility, Reeves is also involved
							in music and philanthropy, making him not only a beloved actor but
							also a respected figure off-screen.*/}
						</Text>
					</View>

					<MovieList data={personMovies} title={"Movies"} hideSeeAll={true} />
				</View>
			)}
		</ScrollView>
	);
};

export default PersonScreen;
