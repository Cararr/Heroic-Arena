import './DataEditor.css';
import WorldForm from '../WorldForm/WorldForm';
import HeroForm from '../HeroForm/HeroForm';
import PropTypes from 'prop-types';

export default function DataEditor(props) {
	return (
		<div className="data-editor">
			<h3>Editor's panel</h3>
			<h2>
				{(props.selectedWorld && `Edit world #${props.selectedWorld.id}`) ||
					(props.selectedHero && `Edit hero #${props.selectedHero.id}`) ||
					(props.isCreateWorldOn && 'Create new World') ||
					(props.isCreateHeroOn && 'Create new Hero')}
			</h2>
			{(props.worldResponse || props.heroResponse) && (
				<p className="database-response">
					{props.worldResponse || props.heroResponse}
				</p>
			)}
			{props.selectedWorld && (
				<WorldForm
					selectedWorld={props.selectedWorld}
					updateInstance={props.updateInstance}
					deleteInstance={props.deleteInstance}
				/>
			)}
			{props.selectedHero && (
				<HeroForm
					selectedHero={props.selectedHero}
					worlds={props.worlds}
					updateInstance={props.updateInstance}
					deleteInstance={props.deleteInstance}
				/>
			)}
			{props.isCreateWorldOn && (
				<WorldForm
					addInstance={props.addInstance}
					isCreateWorldOn={props.isCreateWorldOn}
				/>
			)}
			{props.isCreateHeroOn && (
				<HeroForm
					addInstance={props.addInstance}
					isCreateHeroOn={props.isCreateHeroOn}
					worlds={props.worlds}
				/>
			)}
		</div>
	);
}

DataEditor.propTypes = {
	isCreateWorldOn: PropTypes.bool,
	isCreateHeroOn: PropTypes.bool,
	addInstance: PropTypes.func,
	updateInstance: PropTypes.func,
	deleteInstance: PropTypes.func,
	worlds: PropTypes.array,
	selectedWorld: PropTypes.object,
	selectedHero: PropTypes.object,
	worldResponse: PropTypes.string,
	heroResponse: PropTypes.string,
};
