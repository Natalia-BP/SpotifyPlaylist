import React, { useEffect, useState } from "react";

export const MusicPlayer = () => {
	const [playlist, setPlaylist] = useState([]);

	useEffect(() => {
		songList();
	}, []);

	const songList = () => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => response.json())
			.then(data => setPlaylist(data));
	};

	return (
		<>
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
						playlist.map(song => {
							return (
								<tr key={song.id}>
									<th scope="row">{song.id}</th>
									<td>{song.name}</td>
									<td>{song.category || song.game}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
};
