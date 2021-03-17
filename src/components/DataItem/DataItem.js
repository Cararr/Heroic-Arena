import './DataItem.css';
import PropTypes from 'prop-types';

export default function DataItem(props) {
	return (
		<div
			onClick={() => {
				props.world
					? props.selectWorld(props.world)
					: props.selectHero(props.hero);
			}}
			className={`data-item ${
				props.world ? 'data-item-world' : 'data-item-hero'
			} ${props.isSelected && 'selected'}`}
		>
			<p className="data-item-id">Id: {props.hero?.id || props.world?.id}</p>
			<p className="data-item-name">{props.hero?.name || props.world?.name}</p>
		</div>
	);
}

DataItem.propTypes = {
	isSelected: PropTypes.bool.isRequired,
	selectWorld: PropTypes.func,
	selectHero: PropTypes.func,
	world: PropTypes.object,
	hero: PropTypes.object,
};
