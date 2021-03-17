import React, { Component } from 'react';
import './DataItem.css';
import PropTypes from 'prop-types';

export default class DataItem extends Component {
	render() {
		return (
			<div
				onClick={() => {
					this.props.world
						? this.props.selectWorld(this.props.world)
						: this.props.selectHero(this.props.hero);
				}}
				className={`data-item ${
					this.props.world ? 'data-item-world' : 'data-item-hero'
				} ${this.props.isSelected && 'selected'}`}
			>
				<p className="data-item-id">
					Id: {this.props.hero?.id || this.props.world?.id}
				</p>
				<p className="data-item-name">
					{this.props.hero?.name || this.props.world?.name}
				</p>
			</div>
		);
	}
}

DataItem.propTypes = {
	isSelected: PropTypes.bool.isRequired,
	selectWorld: PropTypes.func,
	selectHero: PropTypes.func,
	world: PropTypes.object,
	hero: PropTypes.object,
};
