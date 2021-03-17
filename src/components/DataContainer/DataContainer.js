import React, { Component } from 'react';
import './DataContainer.css';
import DataEditor from '../DataEditor/DataEditor';
import DataItem from '../DataItem/DataItem';
import WorldForm from '../WorldForm/WorldForm';
import HeroForm from '../HeroForm/HeroForm';
import PropTypes from 'prop-types';

export default class DataContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createNewWorldOn: false,
		};
	}

	render() {
		const worlds = this.props.worlds?.map((world) => (
			<DataItem
				isSelected={world.id === this.props.selectedWorld?.id}
				selectWorld={this.props.selectWorld}
				key={world.id.toString()}
				world={world}
			/>
		));
		const heroes = this.props.heroes?.map((hero) => (
			<DataItem
				isSelected={hero.id === this.props.selectedHero?.id}
				selectHero={this.props.selectHero}
				key={hero.id.toString()}
				hero={hero}
			/>
		));
		return (
			<div className="data-container">
				<div className="data-list">
					<h3>{this.props.worlds ? 'Worlds:' : 'Heroes:'}</h3>
					<div className="data-container-grid">
						{worlds || heroes}
						<i
							className="data-icon icon-crown-plus"
							onClick={
								this.props.worldCreatorOpenClose ||
								this.props.heroCreatorOpenClose
							}
						></i>
					</div>
				</div>
				{(this.props.selectedWorld ||
					this.props.selectedHero ||
					this.props.worldResponse ||
					this.props.heroResponse) && (
					<DataEditor
						worlds={this.props.worldsList}
						worldResponse={this.props.worldResponse}
						heroResponse={this.props.heroResponse}
						selectedWorld={this.props.selectedWorld}
						selectedHero={this.props.selectedHero}
						updateInstance={this.props.updateInstance}
						deleteInstance={this.props.deleteInstance}
					/>
				)}
				{this.props.isCreateWorldOn && (
					<DataEditor
						addInstance={this.props.addInstance}
						isCreateWorldOn={this.props.isCreateWorldOn}
					>
						<WorldForm />
					</DataEditor>
				)}
				{this.props.isCreateHeroOn && (
					<DataEditor
						addInstance={this.props.addInstance}
						isCreateHeroOn={this.props.isCreateHeroOn}
						worlds={this.props.worldsList}
					>
						<HeroForm />
					</DataEditor>
				)}
			</div>
		);
	}
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
	worldsList: PropTypes.array,
	selectedWorld: PropTypes.object,
	selectedHero: PropTypes.object,
	worldResponse: PropTypes.string,
	heroResponse: PropTypes.string,
};
