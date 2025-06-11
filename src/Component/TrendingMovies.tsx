import {
	View,
	Text,
	TouchableWithoutFeedback,
	Dimensions,
	Image,
	Pressable,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { image500 } from "../api/Moviedb";

interface TrendingMoviesProps {
	data: any[];
}

interface MovieCardProps {
	item: any;
	handleClick: any;
}

const { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }: TrendingMoviesProps) => {
	const navigation = useNavigation<any>();

	const handleClick = (item: any) => {
		navigation.navigate("Movie", { movie: item });
	};

	return (
		<View className="mb-8 ">
			<Text className="text-white text-xl mx-4 mb-5">TrendingMovies</Text>
			<Carousel
				data={data}
				renderItem={({ item }) => (
					<MovieCard item={item} handleClick={() => handleClick(item)} />
				)}
				width={width}
				height={height * 0.4}
				autoPlay={false}
				loop={true}
				snapEnabled={true}
				pagingEnabled={true}
				overscrollEnabled={true}
				mode="parallax"
				modeConfig={{
					parallaxScrollingOffset: 160,
					parallaxScrollingScale: 0.95,
					parallaxAdjacentItemScale: 0.8,
				}}
				style={{
					width: width,
				}}
			/>
		</View>
	);
};

export default TrendingMovies;

const MovieCard = ({ item, handleClick }: MovieCardProps) => {
	//console.log("item.poster_path:", item.poster_path);

	return (
		<Pressable
			style={{ width: width, overflow: "hidden", alignItems: "center" }}
			onPress={() => handleClick(item)}
		>
			<Image
				source={{ uri: image500(item.poster_path) }}
				style={{
					width: "60%",
					height: "100%",
				}}
				className="rounded-3xl"
			/>
		</Pressable>
	);
};
