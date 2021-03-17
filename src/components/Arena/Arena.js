import React from 'react';
import './Arena.css';
import ArenaAvatar from '../ArenaAvatar/ArenaAvatar';
import PropTypes from 'prop-types';

export default class Arena extends React.Component {
	constructor(props) {
		super(props);
		this.entranceDrums = new Audio('entrance_drums.wav');
	}

	render() {
		const contestants = this.props.heroes.map((contestant) => (
			<ArenaAvatar key={contestant.name} hero={contestant} />
		));
		return <div className="arena-container">{contestants}</div>;
	}

	componentDidMount() {
		document
			.querySelectorAll('.avatar')
			.forEach(
				(avatar) =>
					(avatar['style'].justifySelf =
						Math.random() > 0.5 ? 'start' : 'center')
			);

		this.entranceDrums.play();
		if (this.props.heroes.length) this.props.arenaResolve();
	}
	componentDidUpdate(prevProps) {
		if (this.props.heroes !== prevProps.heroes) {
			const arenaCont = document.querySelector('.arena-container');
			arenaCont['style'].display = 'flex';
			arenaCont['style'].justifyContent = 'center';
			arenaCont['style'].alignItems = 'center';
		}
	}
	componentWillUnmount() {
		this.entranceDrums.pause();
	}
}

Arena.propTypes = {
	arenaResolve: PropTypes.func.isRequired,
	heroes: PropTypes.array.isRequired,
};
