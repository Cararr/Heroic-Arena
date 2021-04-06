import './Game.css';
import React, { useState, useEffect, useRef } from 'react';
import World from '../World/World';
import Hero from '../Hero/Hero';
import ChooseHeroHeader from '../ChooseHeroHeader/ChooseHeroHeader';
import ChoosePlayersNumber from '../ChoosePlayersNumber/ChoosePlayersNumber';
import Arena from '../Arena/Arena';
import ArenaResults from '../ArenaResults/ArenaResults';
import PropTypes from 'prop-types';

export default function Game(props) {
	// Theme used on the game results
	const finalMusic = useRef(new Audio('final_music.wav'));

	const [whichPlayerTurn, setWhichPlayerTurn] = useState(1);
	const [howManyPlayers, setHowManyPlayers] = useState(0);
	const [shouldArenaStart, setShouldArenaStart] = useState(false);
	// Check if all players have already selected a hero
	useEffect(() => {
		if (whichPlayerTurn === howManyPlayers + 1 && howManyPlayers)
			setShouldArenaStart(true);
	}, [whichPlayerTurn]);
	// Check if a world should be disabled (world has no heroes)
	const [disabledWorlds, setdisabledWorlds] = useState(
		props.worlds
			.filter(
				(world) => !props.heroes.some((hero) => hero.worldId === world.id)
			)
			.map((worldWithoutHeroes) => worldWithoutHeroes.id)
	);
	const [heroesSelected, setHeroesSelected] = useState([]);
	const [worldSelected, setWorldSelected] = useState(null);
	// Check if a world should be disabled (no heroes to choose left)
	useEffect(() => {
		const lastWorldSelected =
			heroesSelected[heroesSelected.length - 1]?.worldId;
		if (
			heroesSelected.filter((hero) => hero.worldId === lastWorldSelected)
				.length ===
			props.heroes.filter((hero) => hero.worldId === lastWorldSelected).length
		) {
			setdisabledWorlds((prev) => [...prev, lastWorldSelected]);
		}
	}, [heroesSelected]);

	const unselectWorld = () => setWorldSelected(() => null);

	const selectWorld = (id) => {
		setWorldSelected(() => id);
	};

	const submitPlayersNumber = (playersNumber) =>
		setHowManyPlayers(() => playersNumber);

	const selectHero = (hero) => {
		setWhichPlayerTurn((prev) => prev + 1);
		setWorldSelected(() => null);
		setHeroesSelected((prev) => [...prev, hero]);
	};

	const resolveGame = () => {
		// Make an array of selected heroes and their powers
		const resultsArray = heroesSelected.map((hero, index) => ({
			player: index + 1,
			finalPower: hero.power + divineFavour(),
		}));
		// Set the winning hero
		let winner = resultsArray[0];
		for (let index = 1; index < resultsArray.length; index++) {
			if (resultsArray[index].finalPower > winner.finalPower)
				winner = resultsArray[index];
		}
		// And set it as an only one left
		setTimeout(() => {
			const survivor = heroesSelected[winner.player - 1];
			setHeroesSelected([survivor]);
		}, 10000);
		// Render the Arena Results panel
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
		setHeroesSelected([]);
		setWorldSelected(null);
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

	// Render the arena
	if (shouldArenaStart)
		return (
			<div>
				<Arena arenaResolve={resolveGame} heroes={heroesSelected} />
				<ArenaResults restart={restartGame} />
			</div>
		);
	// Render heroes list if world has been selected
	else if (worldSelected) {
		// Filter out already selected heroes
		const heroes = props.heroes
			.filter((hero) => {
				return (
					!heroesSelected.some((heroesList) => heroesList.id === hero.id) &&
					hero.worldId === worldSelected
				);
			})
			.map((hero) => {
				return <Hero hero={hero} key={hero.id} onClick={selectHero} />;
			});
		return (
			<div>
				<ChooseHeroHeader turn={whichPlayerTurn} />
				<div>
					<div className="content">{heroes}</div>
					<button onClick={unselectWorld}>Wróć</button>
				</div>
			</div>
		);
	}
	// Render worlds list if players number was set
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
				<ChooseHeroHeader turn={whichPlayerTurn} />
				<div className="content">{worlds}</div>
			</div>
		);
	} // If none of the above conditions were met that means players number wasnt set
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

// Random boost to heroes power's to make it a bit more random
function divineFavour() {
	return Math.floor(Math.random() * 30);
}

Game.propTypes = {
	backToWelcomePage: PropTypes.func.isRequired,
	heroes: PropTypes.array.isRequired,
	worlds: PropTypes.array.isRequired,
};
