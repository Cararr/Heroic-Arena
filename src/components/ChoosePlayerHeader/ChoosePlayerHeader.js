import './ChoosePlayerHeader.css';
import PropTypes from 'prop-types';

export default function ChoosePlayerHeader(props) {
	return (
		<h1 className="choose-player-header">
			Player {props.turn} - choose your hero!
		</h1>
	);
}

ChoosePlayerHeader.propTypes = {
	turn: PropTypes.number.isRequired,
};
