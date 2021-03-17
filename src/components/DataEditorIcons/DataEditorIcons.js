import './DataEditorIcons.css';
import PropTypes from 'prop-types';

export default function DataEditorIcons(props) {
	let type;
	if (props.selectedWorld || props.isCreateWorldOn) type = 'world';
	if (props.selectedHero || props.isCreateHeroOn) type = 'hero';
	return (
		<div className="data-icons-container">
			{(props.isCreateWorldOn || props.isCreateHeroOn) && (
				<button onClick={() => props.addInstance(type, props.currentForm)}>
					Create
				</button>
			)}
			{!props.isCreateWorldOn && !props.isCreateHeroOn && (
				<i
					className="data-icon icon-arrows-cw"
					onClick={() => props.updateInstance(type, props.currentForm)}
				></i>
			)}
			{!props.isCreateWorldOn && !props.isCreateHeroOn && (
				<i
					className="data-icon icon-crown-minus"
					onClick={() => props.deleteInstance(type)}
				></i>
			)}
			<p className="data-icon-description description-update">{`Update selected ${type}`}</p>
			<p className="data-icon-description description-delete">{`Delete selected ${type}`}</p>
		</div>
	);
}

DataEditorIcons.propTypes = {
	isCreateWorldOn: PropTypes.bool,
	isCreateHeroOn: PropTypes.bool,
	addInstance: PropTypes.func,
	updateInstance: PropTypes.func,
	deleteInstance: PropTypes.func,
	selectedWorld: PropTypes.object,
	selectedHero: PropTypes.object,
	currentForm: PropTypes.object.isRequired,
};
