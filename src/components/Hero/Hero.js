import './Hero.css';
import PropTypes from 'prop-types';

export default function Hero(props) {
	return (
		<div onClick={() => props.onClick(props.hero)} className="hero">
			<div>
				<img alt={`${props.hero.name}`} src={props.hero.image} />
				<p className="hero-name">{props.hero.name}</p>
				<p>
					<span>Type:</span> {props.hero.type}
				</p>
				<p>
					<span>Strenghts:</span> {props.hero.strengths}
				</p>
				<p>
					<span>Weakness:</span> {props.hero.weakness}
				</p>
			</div>
		</div>
	);
}

Hero.propTypes = {
	hero: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
};
