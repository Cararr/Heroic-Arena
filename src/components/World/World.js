import './World.css';
import PropTypes from 'prop-types';

export default function World(props) {
	return (
		<div
			onClick={() => {
				props.isDisabled || props.onClick(props.world.id);
			}}
			className={props.isDisabled ? 'disabled_world' : 'world'}
		>
			<div className="world-info-container">
				{props.world.logoUrl && (
					<img alt={`${props.world.name} logo`} src={props.world.logoUrl}></img>
				)}
				<p className="world-name">{props.world.name}</p>
				<p>{props.world.worldOrigin}</p>
			</div>
		</div>
	);
}

World.propTypes = {
	isDisabled: PropTypes.bool.isRequired,
	world: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
};
