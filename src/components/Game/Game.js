import './Game.css';
import React, { useState, useEffect, useRef } from 'react';
import World from '../World/World';
import Hero from '../Hero/Hero';
import ChoosePlayerHeader from '../ChoosePlayerHeader/ChoosePlayerHeader';
import ChoosePlayersNumber from '../ChoosePlayersNumber/ChoosePlayersNumber';
import Arena from '../Arena/Arena';
import ArenaResults from '../ArenaResults/ArenaResults';
import PropTypes from 'prop-types';

export default function Game(props) {
	const finalMusic = useRef(new Audio('final_music.wav'));

	const [whichPlayerTurn, setWhichPlayerTurn] = useState(1);
	const [howManyPlayers, setHowManyPlayers] = useState(0);
	const [shouldArenaStart, setShouldArenaStart] = useState(false);
	useEffect(() => {
		if (whichPlayerTurn === howManyPlayers + 1 && howManyPlayers)
			setShouldArenaStart(true);
	}, [whichPlayerTurn]);

	const [disabledWorlds, setdisabledWorlds] = useState(
		props.worlds
			.filter(
				(world) => !props.heroes.some((hero) => hero.worldId === world.id)
			)
			.map((worldWithoutHeroes) => worldWithoutHeroes.id)
	);
	const [heroesChoosed, setHeroesChoosed] = useState([]);
	const [worldChoosen, setWorldChoosen] = useState(null);
	useEffect(() => {
		const lastWorldChoosen = heroesChoosed[heroesChoosed.length - 1]?.worldId;
		if (
			heroesChoosed.filter((hero) => hero.worldId === lastWorldChoosen)
				.length ===
			props.heroes.filter((hero) => hero.worldId === lastWorldChoosen).length
		) {
			setdisabledWorlds((prev) => [...prev, lastWorldChoosen]);
		}
	}, [heroesChoosed]);

	const unselectWorld = () => setWorldChoosen(() => null);

	const selectWorld = (id) => {
		setWorldChoosen(() => id);
	};

	const submitPlayersNumber = (playersNumber) =>
		setHowManyPlayers(() => playersNumber);

	const chooseHero = (hero) => {
		setWhichPlayerTurn((prev) => prev + 1);
		setWorldChoosen(() => null);
		setHeroesChoosed((prev) => [...prev, hero]);
	};

	const resolveGame = () => {
		const resultsArray = heroesChoosed.map((hero, index) => ({
			player: index + 1,
			finalPower: hero.power + divineFavour(),
		}));

		let winner = resultsArray[0];
		for (let index = 1; index < resultsArray.length; index++) {
			if (resultsArray[index].finalPower > winner.finalPower)
				winner = resultsArray[index];
		}

		setTimeout(() => {
			const survivor = heroesChoosed[winner.player - 1];
			setHeroesChoosed([survivor]);
		}, 10000);

		setTimeout(() => {
			finalMusic.current.play();
			const finalPanel = document.querySelector('#results');
			const finalPanelHeader = document.querySelector('#results_header');
			finalPanel['style'].display = 'flex';
			finalPanelHeader['innerText'] = `Hail Player ${winner.player}!`;
		}, 16000);
	};

	const restartGame = () => {
		finalMusic.current.load();
		setHeroesChoosed([]);
		setWorldChoosen(null);
		setWhichPlayerTurn(1);
		setHowManyPlayers(0);
		setShouldArenaStart(false);
		setdisabledWorlds(
			props.worlds
				.filter(
					(world) => !props.heroes.some((hero) => hero.worldId === world.id)
				)
				.map((worldWithoutHeroes) => worldWithoutHeroes.id)
		);
	};

	//render arena
	if (shouldArenaStart)
		return (
			<div>
				<Arena arenaResolve={resolveGame} heroes={heroesChoosed} />
				<ArenaResults restart={restartGame} />
			</div>
		);
	//render hero choosing panel
	else if (worldChoosen) {
		//filter already choosed heroes
		const heroes = props.heroes
			.filter((hero) => {
				return (
					!heroesChoosed.some(
						(heroesChoosed) => heroesChoosed.id === hero.id
					) && hero.worldId === worldChoosen
				);
			})
			.map((hero) => {
				return <Hero hero={hero} key={hero.id} onClick={chooseHero} />;
			});
		return (
			<div>
				<ChoosePlayerHeader turn={whichPlayerTurn} />
				<div>
					<div className="content">{heroes}</div>
					<button onClick={unselectWorld}>Wróć</button>
				</div>
			</div>
		);
	}
	//render world choosing panel
	else if (howManyPlayers) {
		const worlds = props.worlds.map((world) => (
			<World
				isDisabled={disabledWorlds.includes(world.id)}
				world={world}
				key={world.id}
				onClick={selectWorld}
			/>
		));
		return (
			<div>
				<ChoosePlayerHeader turn={whichPlayerTurn} />
				<div className="content">{worlds}</div>
			</div>
		);
	} //render how many players form
	else
		return (
			<div>
				<button
					onClick={props.backToWelcomePage}
					className="back-to-welcome-page-button"
				>
					Back to the Welcome Page
				</button>
				<ChoosePlayersNumber submitPlayersNumber={submitPlayersNumber} />
			</div>
		);
}

function divineFavour() {
	return Math.floor(Math.random() * 30);
}

Game.propTypes = {
	backToWelcomePage: PropTypes.func.isRequired,
	heroes: PropTypes.array.isRequired,
	worlds: PropTypes.array.isRequired,
};
