import './Hero.css';
import React from 'react';

export default class Hero extends React.Component {
	render() {
		return (
			<div onClick={() => this.props.onClick(this.props.hero)} className="hero">
				<div>
					<img alt={`${this.props.hero.name}`} src={this.props.hero.image} />
					<p className="hero-name">{this.props.hero.name}</p>
					<p>
						<span>Type:</span> {this.props.hero.type}
					</p>
					<p>
						<span>Strenghts:</span> {this.props.hero.strengths}
					</p>
					<p>
						<span>Weakness:</span> {this.props.hero.weakness}
					</p>
				</div>
			</div>
		);
	}
}
