import React, { useEffect } from 'react';
import './Arena.css';
import ArenaAvatar from '../ArenaAvatar/ArenaAvatar';
import PropTypes from 'prop-types';

export default function Arena(props) {
	const entranceDrums = new Audio('entrance_drums.wav');

	useEffect(() => {
		if (props.heroes.length > 1) {
			document
				.querySelectorAll('.avatar')
				.forEach(
					(avatar) =>
						(avatar['style'].justifySelf =
							Math.random() > 0.5 ? 'start' : 'center')
				);
			entranceDrums.play();
			props.arenaResolve();
		} else if (props.heroes.length === 1) {
			const arenaCont = document.querySelector('.arena-container');
			arenaCont['style'].display = 'flex';
			arenaCont['style'].justifyContent = 'center';
			arenaCont['style'].alignItems = 'center';
		}
	});

	const contestants = props.heroes.map((contestant) => (
		<ArenaAvatar key={contestant.name} hero={contestant} />
	));

	return <div className="arena-container">{contestants}</div>;
}

Arena.propTypes = {
	arenaResolve: PropTypes.func.isRequired,
	heroes: PropTypes.array.isRequired,
};
