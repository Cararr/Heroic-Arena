import './Game.css';
import React from 'react';
import World from '../World/World';
import Hero from '../Hero/Hero';
import ChoosePlayerHeader from '../ChoosePlayerHeader/ChoosePlayerHeader';
import ChoosePlayersNumber from '../ChoosePlayersNumber/ChoosePlayersNumber';
import Arena from '../Arena/Arena';
import ArenaResults from '../ArenaResults/ArenaResults';
import PropTypes from 'prop-types';

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.finalMusic = new Audio('final_music.wav');
		this.state = {
			disabledWorlds: this.props.worlds
				.filter(
					(world) =>
						!this.props.heroes.some((hero) => hero.worldId === world.id)
				)
				.map((worldWithoutHeroes) => worldWithoutHeroes.id),
			heroesChoosed: [],
			worldChoosen: null,
			whichPlayerTurn: 1,
			howManyPlayers: 0,
			shouldArenaStart: false,
		};
	}

	unselectWorld = () =>
		this.setState({
			worldChoosen: null,
		});

	selectWorld = (id) => {
		this.setState({
			worldChoosen: id,
		});
	};

	submitPlayersNumber = (playersNumber) =>
		this.setState({ howManyPlayers: playersNumber });

	chooseHero = (hero) =>
		this.setState({
			heroesChoosed: [...this.state.heroesChoosed, hero],
			whichPlayerTurn: this.state.whichPlayerTurn + 1,
			worldChoosen: null,
		});

	resolveGame = () => {
		const resultsArray = this.state.heroesChoosed.map((hero, index) => ({
			player: index + 1,
			finalPower: hero.power + divineFavour(),
		}));

		let winner = resultsArray[0];
		for (let index = 1; index < resultsArray.length; index++) {
			if (resultsArray[index].finalPower > winner.finalPower)
				winner = resultsArray[index];
		}

		setTimeout(() => {
			const survivor = this.state.heroesChoosed[winner.player - 1];
			this.setState({ heroesChoosed: [survivor] });
		}, 10000);

		setTimeout(() => {
			const finalPanel = document.querySelector('#results');
			const finalPannelHeader = document.querySelector('#results_header');
			this.finalMusic.play();
			finalPanel['style'].display = 'flex';
			finalPannelHeader['innerText'] = `Hail Player ${winner.player}!`;
		}, 16000);
	};

	restartGame = () => {
		this.finalMusic.load();
		this.setState({
			disabledWorlds: this.props.worlds
				.filter(
					(world) =>
						!this.props.heroes.some((hero) => hero.worldId === world.id)
				)
				.map((worldWithoutHeroes) => worldWithoutHeroes.id),
			heroesChoosed: [],
			worldChoosen: null,
			whichPlayerTurn: 1,
			howManyPlayers: 0,
			shouldArenaStart: false,
		});
	};

	render() {
		//render arena
		if (this.state.shouldArenaStart)
			return (
				<div>
					<Arena
						arenaResolve={this.resolveGame}
						heroes={this.state.heroesChoosed}
					/>
					<ArenaResults restart={this.restartGame} />
				</div>
			);
		//render hero choosing panel
		else if (this.state.worldChoosen) {
			//filter already choosed heroes
			const heroes = this.props.heroes
				.filter((hero) => {
					return (
						!this.state.heroesChoosed.some(
							(heroesChoosed) => heroesChoosed.id === hero.id
						) && hero.worldId === this.state.worldChoosen
					);
				})
				.map((hero) => {
					return <Hero hero={hero} key={hero.id} onClick={this.chooseHero} />;
				});
			return (
				<div>
					<ChoosePlayerHeader turn={this.state.whichPlayerTurn} />
					<div>
						<div className="content">{heroes}</div>
						<button onClick={this.unselectWorld}>Wróć</button>
					</div>
				</div>
			);
		}
		//render world choosing panel
		else if (this.state.howManyPlayers) {
			const worlds = this.props.worlds.map((world) => (
				<World
					isDisabled={this.state.disabledWorlds.includes(world.id)}
					world={world}
					key={world.id}
					onClick={this.selectWorld}
				/>
			));
			return (
				<div>
					<ChoosePlayerHeader turn={this.state.whichPlayerTurn} />
					<div className="content">{worlds}</div>
				</div>
			);
		} //render how many players form
		else
			return (
				<div>
					<button
						onClick={this.props.backToWelcomePage}
						className="back-to-welcome-page-button"
					>
						Back to the Welcome Page
					</button>
					<ChoosePlayersNumber submitPlayersNumber={this.submitPlayersNumber} />
				</div>
			);
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			prevState.whichPlayerTurn !== this.state.whichPlayerTurn &&
			this.state.whichPlayerTurn === this.state.howManyPlayers + 1
		) {
			this.setState({ shouldArenaStart: true });
		}

		//check if a world should be disabled because of all its heroes taken
		if (
			this.state.heroesChoosed.filter(
				(hero) => hero.worldId === prevState.worldChoosen
			).length &&
			this.state.heroesChoosed.filter(
				(hero) => hero.worldId === prevState.worldChoosen
			).length ===
				this.props.heroes.filter(
					(hero) => hero.worldId === prevState.worldChoosen
				).length
		)
			this.setState({
				disabledWorlds: [...this.state.disabledWorlds, prevState.worldChoosen],
			});
	}
}

function divineFavour() {
	return Math.floor(Math.random() * 30);
}

Game.propTypes = {
	backToWelcomePage: PropTypes.func.isRequired,
	heroes: PropTypes.array.isRequired,
	worlds: PropTypes.array.isRequired,
};
