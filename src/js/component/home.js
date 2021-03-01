import React, { useEffect, useState, useRef } from "react";

export function Home() {
	//FUNCIONALIDAD ENTERA
	//Fetching the array and storing it
	const [playlist, setPlaylist] = useState([]);
	const [currentSong, setCurrentSong] = useState(0);

	useEffect(() => {
		songList();
	}, []);

	const songList = () => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => response.json())
			.then(data => setPlaylist(data));
	};

	//UseRef to call on <audio/> from MusicPlayer
	const audio = useRef();

	// Song functionality
	async function playSong() {
		audio.current.pause();

		audio.current.src =
			(await "https://assets.breatheco.de/apis/sound/") + currentSong.url;
		await audio.current.play();
		//.ended boolean tira false mientras da play, tira true cuando termina
		const newId = currentSong.id + 1;

		audio.current.ended == true ? setCurrentSong(playlist[newId - 1]) : "";
		console.log("Im the current song " + currentSong);
		setBtn("pause");
	}

	function pauseSong() {
		audio.current.pause();
	}

	//Button functionality
	const [playBtn, setBtn] = useState("play");

	function toggleBtn() {
		playBtn == "play" ? setBtn("pause") : setBtn("play");
		playBtn == "play" ? audio.current.play() : audio.current.pause();
	}

	return (
		<>
			{/* Lista de canciones */}
			<div id="MusicPlayer">
				<table className="table table-striped table-hover table-dark text-white-50">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Title</th>
							<th scope="col">Category</th>
						</tr>
					</thead>
					<tbody>
						{playlist.length > 0 &&
							playlist.map((song, index) => {
								return (
									<tr
										key={song.id}
										onClick={() => {
											setCurrentSong({
												indice: index,
												...song
											});
											playSong();
										}}>
										{/* <th scope="row">{song.id}</th> */}
										<th scope="row">{index}</th>
										<td>
											{song.name}
											<audio ref={audio} />
										</td>
										<td>{song.category || song.game}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>

			{/* Barra de botones */}
			<div id="PlayBar">
				<div className="playBar d-flex justify-content-center">
					<div className="row p-2 align-items-center">
						<a
							onClick={() => {
								setCurrentSong({
									indice: parseInt(currentSong.indice) - 1,
									...playlist[
										parseInt(currentSong.indice) - 1
									]
								});
								playSong();
							}}>
							<i className="fas fa-step-backward"></i>
						</a>

						<i
							className={
								"fas " +
								(playBtn == "pause"
									? "fa-pause-circle"
									: "fa-play-circle")
							}
							onClick={() => {
								toggleBtn();
							}}
							role="button"></i>
						<a
							onClick={() => {
								setCurrentSong({
									indice: parseInt(currentSong.indice) + 1,
									...playlist[
										parseInt(currentSong.indice) + 1
									]
								});
								playSong();
							}}>
							<i className="fas fa-step-forward"></i>
						</a>
						{/* <i className="fas fa-headphones-alt"></i> */}
					</div>
				</div>
			</div>
			<div style={{ color: "red" }}>{JSON.stringify(currentSong)}</div>
			<div style={{ color: "blue" }}>{JSON.stringify(playlist)}</div>
		</>
	);
}
