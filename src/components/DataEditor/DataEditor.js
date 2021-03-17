import React, { Component } from 'react';
import './DataEditor.css';
import WorldForm from '../WorldForm/WorldForm';
import HeroForm from '../HeroForm/HeroForm';
import PropTypes from 'prop-types';

export default class DataEditor extends Component {
	render() {
		return (
			<div className="data-editor">
				<h3>Editor's panel</h3>
				<h2>
					{(this.props.selectedWorld &&
						`Edit world #${this.props.selectedWorld.id}`) ||
						(this.props.selectedHero &&
							`Edit hero #${this.props.selectedHero.id}`) ||
						(this.props.isCreateWorldOn && 'Create new World') ||
						(this.props.isCreateHeroOn && 'Create new Hero')}
				</h2>
				{(this.props.worldResponse || this.props.heroResponse) && (
					<p className="database-response">
						{this.props.worldResponse || this.props.heroResponse}
					</p>
				)}
				{this.props.selectedWorld && (
					<WorldForm
						selectedWorld={this.props.selectedWorld}
						updateInstance={this.props.updateInstance}
						deleteInstance={this.props.deleteInstance}
					/>
				)}
				{this.props.selectedHero && (
					<HeroForm
						selectedHero={this.props.selectedHero}
						worlds={this.props.worlds}
						updateInstance={this.props.updateInstance}
						deleteInstance={this.props.deleteInstance}
					/>
				)}
				{this.props.isCreateWorldOn && (
					<WorldForm
						addInstance={this.props.addInstance}
						isCreateWorldOn={this.props.isCreateWorldOn}
					/>
				)}
				{this.props.isCreateHeroOn && (
					<HeroForm
						addInstance={this.props.addInstance}
						isCreateHeroOn={this.props.isCreateHeroOn}
						worlds={this.props.worlds}
					/>
				)}
			</div>
		);
	}
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
