import React, { Component } from 'react';
import './DataEditorIcons.css';
import PropTypes from 'prop-types';

export default class DataEditorIcons extends Component {
	render() {
		let type;
		if (this.props.selectedWorld || this.props.isCreateWorldOn) type = 'world';
		if (this.props.selectedHero || this.props.isCreateHeroOn) type = 'hero';
		return (
			<div className="data-icons-container">
				{(this.props.isCreateWorldOn || this.props.isCreateHeroOn) && (
					<button
						onClick={() => this.props.addInstance(type, this.props.currentForm)}
					>
						Create
					</button>
				)}
				{!this.props.isCreateWorldOn && !this.props.isCreateHeroOn && (
					<i
						className="data-icon icon-arrows-cw"
						onClick={() =>
							this.props.updateInstance(type, this.props.currentForm)
						}
					></i>
				)}
				{!this.props.isCreateWorldOn && !this.props.isCreateHeroOn && (
					<i
						className="data-icon icon-crown-minus"
						onClick={() => this.props.deleteInstance(type)}
					></i>
				)}
				<p className="data-icon-description description-update">{`Update selected ${type}`}</p>
				<p className="data-icon-description description-delete">{`Delete selected ${type}`}</p>
			</div>
		);
	}
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
