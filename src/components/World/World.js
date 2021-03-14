import './World.css';
import React from 'react';

export default class World extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div
				onClick={() => {
					this.props.isDisabled || this.props.onClick(this.props.world.id);
				}}
				className={this.props.isDisabled ? 'disabled_world' : 'world'}
			>
				<div className="world-info-container">
					{this.props.world.logoUrl && (
						<img
							alt={`${this.props.world.name} logo`}
							src={this.props.world.logoUrl}
						></img>
					)}
					<p className="world-name">{this.props.world.name}</p>
					<p>{this.props.world.worldOrigin}</p>
				</div>
			</div>
		);
	}
}
