import React from 'react';
import './ArenaAvatar.css';

export default class ArenaAvatar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return (
			<div className="avatar">
				<img
					alt={this.props.hero.name}
					src={`${this.props.hero.avatarImage}`}
				></img>
			</div>
		);
	}
}
