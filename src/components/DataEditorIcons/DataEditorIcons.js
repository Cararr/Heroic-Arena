import React, { Component } from 'react';
import './DataEditorIcons.css';

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
