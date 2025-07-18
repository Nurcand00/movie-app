import {
	View,
	Text,
	ScrollView,
	Touchable,
	TouchableOpacity,
	Image,
} from "react-native";
import React from "react";
import {
	fallbackMoviePoster,
	fallbackPersonImage,
	image185,
} from "../api/Moviedb";

interface CastProps {
	cast: any[];
	navigation: any;
}

const Cast = ({ cast, navigation }: CastProps) => {
	const personName = "Keanu reevs";
	const characterName = "John Wick";

	return (
		<View className="my-6">
			<Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 15 }}
			>
				{cast &&
					cast.map((person, index) => {
						return (
							<TouchableOpacity
								onPress={() => navigation.navigate("Person", { person })} //map 'deki person verisi gidiyor aynı oldugu için
								key={index}
								className="mr-7 items-center"
							>
								<View className="overflow-hidden rounded-full h-20 w-23 items-center border border-neutral-500">
									<Image
										className="rounded-2xl h-24 w-20"
										//source={require("../assets/keanu.png")}
										source={{
											uri:
												image185(person?.profile_path) || fallbackPersonImage,
										}}
									/>
								</View>
								<Text className="text-white text-sm mt-2">
									{person?.character.length > 10
										? person?.character.slice(0, 10) + "..."
										: person?.character}
								</Text>
								<Text className="text-neutral-400 text-xs mt-1">
									{person?.original_name.length > 10
										? person?.original_name.slice(0, 10) + "..."
										: person?.original_name}
								</Text>
							</TouchableOpacity>
						);
					})}
			</ScrollView>
		</View>
	);
};

export default Cast;
