import {
	View,
	Text,
	Touchable,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Dimensions,
	Image,
	ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../api/Moviedb";

interface MovieListProps {
	title: string;
	data: any;
	hideSeeAll: any;
}

const { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAll }: MovieListProps) => {
	const navigation = useNavigation();
	const movieName = "Ant-Man and the Wasp: Quantumania";

	return (
		<View className="mb-8 space-y-4">
			<View className="mx-4 flex-row justify-between items-center">
				<Text className="text-white text-xl">{title}</Text>

				{!hideSeeAll && (
					<TouchableOpacity>
						<Text className="text-amber-500 text-lg">Sell All</Text>
					</TouchableOpacity>
				)}
			</View>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 15 }}
			>
				{data.map((item, index) => {
					return (
						<TouchableWithoutFeedback
							key={index}
							onPress={() => navigation.push("Movie", { movie: item })}
						>
							<View className="mr-4 space-y-1 mt-5">
								<Image
									source={{
										uri: image185(item.poster_path) || fallbackMoviePoster,
									}}
									//source={require("../assets/antman.png")}
									className="rounded-3xl"
									style={{ width: width * 0.35, height: height * 0.22 }}
								/>
								<Text className="text-neutral-300 ml-1 mt-2">
									{item.title.length > 14 //movieName idi dinamık olmadan önce
										? item.title.slice(0, 14) + "..."
										: item.title}
								</Text>
							</View>
						</TouchableWithoutFeedback>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default MovieList;
