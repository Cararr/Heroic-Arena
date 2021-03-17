import './DataContainer.css';
import DataEditor from '../DataEditor/DataEditor';
import DataItem from '../DataItem/DataItem';
import PropTypes from 'prop-types';

export default function DataContainer(props) {
	const worlds = props.worlds?.map((world) => (
		<DataItem
			isSelected={world.id === props.selectedWorld?.id}
			selectWorld={props.selectWorld}
			key={world.id.toString()}
			world={world}
		/>
	));
	const heroes = props.heroes?.map((hero) => (
		<DataItem
			isSelected={hero.id === props.selectedHero?.id}
			selectHero={props.selectHero}
			key={hero.id.toString()}
			hero={hero}
		/>
	));
	return (
		<div className="data-container">
			<div className="data-list">
				<h3>{props.worlds ? 'Worlds:' : 'Heroes:'}</h3>
				<div className="data-container-grid">
					{worlds || heroes}
					<i
						className="data-icon icon-crown-plus"
						onClick={props.worldCreatorOpenClose || props.heroCreatorOpenClose}
					></i>
				</div>
			</div>
			{(props.selectedWorld ||
				props.selectedHero ||
				props.worldResponse ||
				props.heroResponse) && (
				<DataEditor
					worlds={props.worldsList}
					worldResponse={props.worldResponse}
					heroResponse={props.heroResponse}
					selectedWorld={props.selectedWorld}
					selectedHero={props.selectedHero}
					updateInstance={props.updateInstance}
					deleteInstance={props.deleteInstance}
				/>
			)}
			{props.isCreateWorldOn && (
				<DataEditor
					addInstance={props.addInstance}
					isCreateWorldOn={props.isCreateWorldOn}
				/>
			)}
			{props.isCreateHeroOn && (
				<DataEditor
					addInstance={props.addInstance}
					isCreateHeroOn={props.isCreateHeroOn}
					worlds={props.worldsList}
				/>
			)}
		</div>
	);
}

DataContainer.propTypes = {
	selectWorld: PropTypes.func,
	selectHero: PropTypes.func,
	isCreateWorldOn: PropTypes.bool,
	isCreateHeroOn: PropTypes.bool,
	worldCreatorOpenClose: PropTypes.func,
	heroCreatorOpenClose: PropTypes.func,
	addInstance: PropTypes.func.isRequired,
	updateInstance: PropTypes.func.isRequired,
	deleteInstance: PropTypes.func.isRequired,
	worlds: PropTypes.array,
	heroes: PropTypes.array,
	worldsList: PropTypes.array,
	selectedWorld: PropTypes.object,
	selectedHero: PropTypes.object,
	worldResponse: PropTypes.string,
	heroResponse: PropTypes.string,
};
