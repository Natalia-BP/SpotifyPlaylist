import React, { useState } from "react";

export const PlayBar = () => {
	const [playBtn, setBtn] = useState("play");

	return (
		<>
			<div className="playBar d-flex justify-content-center">
				<div className="row p-2 align-items-center">
					<i className="fas fa-step-backward"></i>
					<i
						className={
							"fas " +
							(playBtn == "pause"
								? "fa-pause-circle"
								: "fa-play-circle")
						}
						onClick={() => {
							playBtn == "play"
								? setBtn("pause")
								: setBtn("play");
						}}></i>
					<i className="fas fa-step-forward"></i>
					{/* <i className="fas fa-headphones-alt"></i> */}
				</div>
			</div>
		</>
	);
};
