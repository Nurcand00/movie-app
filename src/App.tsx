import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import AppNavigation from "./navigation";
import "./global.css";

export function App() {
	return <AppNavigation />;
}
