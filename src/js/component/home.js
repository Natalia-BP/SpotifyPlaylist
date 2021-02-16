import React from "react";
import { MusicPlayer } from "./MusicPlayer";
import { PlayBar } from "./PlayBar";

//create your first component
export function Home() {
	return (
		<>
			<MusicPlayer />
			<PlayBar />
		</>
	);
}
