import {
	View,
	Text,
	Dimensions,
	Platform,
	SafeAreaView,
	TextInput,
	Touchable,
	TouchableOpacity,
	ScrollView,
	TouchableWithoutFeedback,
	Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../Component/Loading";
import debounce from "lodash.debounce";
import { searchMovies } from "../../api/Moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

const SearchScreen = () => {
	const navigation = useNavigation();
	const [results, setResults] = useState([1, 2, 3, 4]);
	const [loading, setLoading] = useState(false);
	const movieName = "Ant-Man and the Wasp: Quantumania";

	const handleSearch = (value: any) => {
		if (value && value.length > 2) {
			setLoading(true);
			searchMovies({
				query: value,
				include_adult: false,
				language: "en-US",
				page: 1,
			}).then((data: any) => {
				setLoading(false);
				console.log("got movies:", data);
			});
		} else {
			setLoading(false);
			setResults([]);
		}
	};

	const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

	return (
		<SafeAreaView className="flex-1 bg-neutral-800">
			<View className="flex-row mx-4 mb-3 justify-between items-center border border-neutral-500 rounded-full">
				<TextInput
					onChangeText={handleTextDebounce}
					placeholder="Search movie"
					placeholderTextColor={"lightgray"}
					className="pb-1 ml-6 flex-1 text-base font-semibold text-white tracking-wider"
				/>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="rounded-full m-1
					bg-neutral-500 p-3"
				>
					<XMarkIcon size="25" color="white" />
				</TouchableOpacity>
			</View>

			{/* useState boş olursa cıkacak ımg en altta */}

			{loading ? ( // ekran açılırken loading gösterilecek
				<Loading />
			) : results.length > 0 ? (
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 15 }}
					className="space-y-3"
				>
					<Text className="text-white font-semibold ml-1">
						Results ({results.length})
					</Text>
					<View className="flex-row justify-between flex-wrap mt-4">
						{results.map((item, index) => {
							return (
								<TouchableWithoutFeedback
									key={index}
									onPress={() => navigation.push("Movie", item)}
								>
									<View className="space-y-2 mb-4 ">
										<Image
											className="rounded-3xl"
											source={require("../../assets/antman.png")}
											style={{ width: width * 0.44, height: height * 0.33 }}
										/>
										<Text className="text-neutral-300 ml-1 mt-3">
											{movieName.length > 22
												? movieName.slice(0, 22) + "..."
												: movieName}
										</Text>
									</View>
								</TouchableWithoutFeedback>
							);
						})}
					</View>
				</ScrollView>
			) : (
				<View className="flex-row mt-28 justify-center">
					<Image
						source={require("../../assets/movıetıme.png")}
						className="h-96 w-96"
					/>
				</View>
			)}
		</SafeAreaView>
	);
};

export default SearchScreen;
