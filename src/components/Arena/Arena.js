import React, { useEffect } from 'react';
import './Arena.css';
import ArenaAvatar from '../ArenaAvatar/ArenaAvatar';
import PropTypes from 'prop-types';

const lastHeroStyles = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

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
		}
	});

	const contestants = props.heroes.map((contestant) => (
		<ArenaAvatar key={contestant.name} hero={contestant} />
	));

	return (
		<div
			style={props.heroes.length === 1 ? lastHeroStyles : {}}
			className="arena-container"
		>
			{contestants}
		</div>
	);
}

Arena.propTypes = {
	arenaResolve: PropTypes.func.isRequired,
	heroes: PropTypes.array.isRequired,
};
