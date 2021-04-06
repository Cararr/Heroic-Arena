import './ChooseHeroHeader.css';
import PropTypes from 'prop-types';

export default function ChooseHeroHeader(props) {
	return (
		<h1 className="choose-hero-header">
			Player {props.turn} - choose your hero!
		</h1>
	);
}

ChooseHeroHeader.propTypes = {
	turn: PropTypes.number.isRequired,
};
