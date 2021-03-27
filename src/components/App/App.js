import React, { useState, useEffect } from 'react';
import Game from '../Game/Game';
import AdminPanel from '../AdminPanel/AdminPanel';
import WelcomePage from '../WelcomePage/WelcomePage';
import '../../fontello/css/fontello.css';
import DB from '../../util/connectToDB';

export default function App() {
	const [isUserAuthorized, setIsUserAuthorized] = useState(false);
	const [shouldGameBegin, setShouldGameBegin] = useState(false);
	const [shouldEnterAdminPanel, setShouldEnterAdminPanel] = useState(false);

	const [worlds, setWorlds] = useState([]);
	const [heroes, setHeroes] = useState([]);
	useEffect(() => {
		loadObjects();
	}, []);

	const loadObjects = async () => {
		const worldsResponse = await DB.getWorlds();
		const loadedWorlds = worldsResponse.worlds.map((world) => ({
			id: world.id,
			name: world.name,
			worldOrigin: world.world_origin,
			logoUrl: world.logo_url,
		}));
		const heroesResponse = await DB.getHeroes();
		const loadedHeroes = heroesResponse.heroes.map((hero) => ({
			id: hero.id,
			worldId: hero.world_id,
			name: hero.name,
			type: hero.type,
			strengths: hero.strengths,
			weakness: hero.weakness,
			power: hero.power_level,
			image: hero.image_url,
			avatarImage: hero.arena_avatar_url,
		}));
		setWorlds(loadedWorlds);
		setHeroes(loadedHeroes);
	};

	const submitLogin = async (userName) => {
		const loginResponse = await DB.logIn(userName);
		if (loginResponse) {
			setIsUserAuthorized(true);
			setShouldEnterAdminPanel(true);
		}
	};

	const addInstance = async (type, objectToAdd) => {
		const response = await DB.addToDB(type, objectToAdd);
		if (type === 'world') {
			if (typeof response === 'object') {
				const createdWorld = {
					id: response.world.id,
					name: response.world.name,
					worldOrigin: response.world.world_origin,
					logoUrl: response.world.logo_url,
				};
				setWorlds((prev) => [...prev, createdWorld]);
				return `Created world #${response.world.id}: ${response.world.name}.`;
			} else return response;
		} else if (type === 'hero') {
			if (typeof response === 'object') {
				const createdHero = {
					id: response.hero.id,
					worldId: response.hero.world_id,
					name: response.hero.name,
					type: response.hero.type,
					strengths: response.hero.strengths,
					weakness: response.hero.weakness,
					power: response.hero.power_level,
					image: response.hero.image_url,
					avatarImage: response.hero.arena_avatar_url,
				};
				setHeroes((prev) => [...prev, createdHero]);
				return `Created hero #${response.hero.id}: ${response.hero.name}.`;
			} else return response;
		} else return `Wrong object type: ${type}`;
	};

	const updateInstance = async (type, updatedObjectData) => {
		const noChangesMessage = `You haven't changed anything at all!`;
		if (type === 'world') {
			const worldToBeUpdated = worlds.find(
				(world) => world.id === updatedObjectData.id
			);
			if (
				worldToBeUpdated.name === updatedObjectData.name &&
				worldToBeUpdated.worldOrigin === updatedObjectData.world_origin &&
				worldToBeUpdated.logoUrl === updatedObjectData.logo_url
			)
				return noChangesMessage;
		}
		if (type === 'hero') {
			const heroToBeUpdated = heroes.find(
				(hero) => hero.id === updatedObjectData.id
			);
			if (
				heroToBeUpdated.name === updatedObjectData.name &&
				heroToBeUpdated.worldId === updatedObjectData.world_id &&
				heroToBeUpdated.type === updatedObjectData.type &&
				heroToBeUpdated.strengths === updatedObjectData.strengths &&
				heroToBeUpdated.weakness === updatedObjectData.weakness &&
				heroToBeUpdated.power === updatedObjectData.power_level &&
				heroToBeUpdated.image === updatedObjectData.image_url &&
				heroToBeUpdated.avatarImage === updatedObjectData.arena_avatar_url
			)
				return noChangesMessage;
		}

		const response = await DB.updateInDB(type, updatedObjectData);
		if (type === 'world') {
			if (typeof response === 'object') {
				const updatedWorlds = worlds;
				updatedWorlds[
					updatedWorlds.findIndex((world) => world.id === response.world.id)
				] = {
					id: response.world.id,
					name: response.world.name,
					worldOrigin: response.world.world_origin,
					logoUrl: response.world.logo_url,
				};
				setWorlds(updatedWorlds);
				return `Updated world #${response.world.id}`;
			} else return response;
		} else if (type === 'hero') {
			if (typeof response === 'object') {
				const updatedHeroes = heroes;
				updatedHeroes[
					updatedHeroes.findIndex((hero) => hero.id === response.hero.id)
				] = {
					id: response.hero.id,
					worldId: response.hero.world_id,
					name: response.hero.name,
					type: response.hero.type,
					strengths: response.hero.strengths,
					weakness: response.hero.weakness,
					power: response.hero.power_level,
					image: response.hero.image_url,
					avatarImage: response.hero.arena_avatar_url,
				};
				setHeroes(updatedHeroes);
				return `Updated hero #${response.hero.id}`;
			} else return response;
		} else return `Wrong object type: ${type}`;
	};

	const deleteInstance = async (type, objectToDelete) => {
		const response = await DB.deleteFromDB(type, objectToDelete);
		if (type === 'world') {
			const worldsAfterDelete = worlds.filter((world) => world.id !== response);
			setWorlds(worldsAfterDelete);
			//if world we want to remove has supplied heroes it wont be romoved
			return typeof response === 'number'
				? `Deleted world #${response}`
				: response;
		} else if (type === 'hero') {
			const heroesAfterDelete = heroes.filter((hero) => hero.id !== response);
			setHeroes(heroesAfterDelete);
			return `Deleted hero #${response}`;
		} else return `Wrong object type: ${type}`;
	};

	const startGame = () => setShouldGameBegin(true);

	const enterAdminPanel = () => setShouldEnterAdminPanel(true);

	const backToWelcomePage = () => {
		setShouldGameBegin(false);
		setShouldEnterAdminPanel(false);
	};

	//Start the Game
	if (shouldGameBegin)
		return (
			<Game
				backToWelcomePage={backToWelcomePage}
				heroes={heroes}
				worlds={worlds}
			/>
		);
	else if (shouldEnterAdminPanel) {
		return (
			<AdminPanel
				addInstance={addInstance}
				updateInstance={updateInstance}
				deleteInstance={deleteInstance}
				startGame={startGame}
				heroes={heroes}
				worlds={worlds}
			/>
		);
	}
	return (
		<WelcomePage
			submitLogin={submitLogin}
			isUserAuthorized={isUserAuthorized}
			enterAdmin={enterAdminPanel}
			startGame={startGame}
		/>
	);
}
