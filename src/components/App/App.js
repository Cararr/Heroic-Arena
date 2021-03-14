import React from 'react';
import Game from '../Game/Game';
import AdminPanel from '../AdminPanel/AdminPanel';
import WelcomePage from '../WelcomePage/WelcomePage';
import '../../fontello/css/fontello.css';
import DB from '../../util/connectToDB';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.submitLogin = this.submitLogin.bind(this);
		this.loadWorlds = this.loadWorlds.bind(this);
		this.loadHeroes = this.loadHeroes.bind(this);
		this.startGame = this.startGame.bind(this);
		this.enterAdminPanel = this.enterAdminPanel.bind(this);
		this.backToWelcomePage = this.backToWelcomePage.bind(this);
		this.addInstance = this.addInstance.bind(this);
		this.updateInstance = this.updateInstance.bind(this);
		this.deleteInstance = this.deleteInstance.bind(this);
		this.state = {
			isUserAuthorized: false,
			shouldGameBegin: false,
			shouldEnterAdminPanel: false,
			worlds: [],
			heroes: [],
		};
	}

	async submitLogin(userName) {
		const isUserAllowed = await DB.logIn(userName);
		if (isUserAllowed) {
			this.setState({ isUserAuthorized: true, shouldEnterAdminPanel: true });
		}
	}

	async addInstance(type, objectToAdd) {
		const response = await DB.addToDB(type, objectToAdd);
		if (type === 'world') {
			if (typeof response === 'object') {
				const createdWorld = {
					id: response.world.id,
					name: response.world.name,
					worldOrigin: response.world.world_origin,
					logoUrl: response.world.logo_url,
				};
				this.setState({ worlds: [...this.state.worlds, createdWorld] });
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
				this.setState({ heroes: [...this.state.heroes, createdHero] });
				return `Created hero #${response.hero.id}: ${response.hero.name}.`;
			} else return response;
		} else return `Wrong object type: ${type}`;
	}

	async updateInstance(type, updatedObjectData) {
		const noChangesMessage = `You haven't changed anything at all!`;
		if (type === 'world') {
			const worldToBeUpdated = this.state.worlds.find(
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
			const heroToBeUpdated = this.state.heroes.find(
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
				const updatedWorlds = this.state.worlds;
				updatedWorlds[
					updatedWorlds.findIndex((world) => world.id === response.world.id)
				] = {
					id: response.world.id,
					name: response.world.name,
					worldOrigin: response.world.world_origin,
					logoUrl: response.world.logo_url,
				};
				this.setState({ worlds: updatedWorlds });
				return `Updated world #${response.world.id}`;
			} else return response;
		} else if (type === 'hero') {
			if (typeof response === 'object') {
				const updatedHeroes = this.state.heroes;
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
				this.setState({ heroes: updatedHeroes });
				return `Updated hero #${response.hero.id}`;
			} else return response;
		} else return `Wrong object type: ${type}`;
	}

	async deleteInstance(type, objectToDelete) {
		const response = await DB.deleteFromDB(type, objectToDelete);
		if (type === 'world') {
			const newWrodls = this.state.worlds.filter(
				(world) => world.id !== response
			);
			this.setState({ worlds: newWrodls });
			//if world we want to remove has supplied heroes it wont be romoved
			return typeof response === 'number'
				? `Deleted world #${response}`
				: response;
		} else if (type === 'hero') {
			const newHeroes = this.state.heroes.filter(
				(hero) => hero.id !== response
			);
			this.setState({ heroes: newHeroes });
			return `Deleted hero #${response}`;
		} else return `Wrong object type: ${type}`;
	}

	async loadWorlds() {
		const worldsResponse = await DB.getWorlds();
		const loadedWorlds = worldsResponse.worlds.map((world) => {
			return {
				id: world.id,
				name: world.name,
				worldOrigin: world.world_origin,
				logoUrl: world.logo_url,
			};
		});
		this.setState({ worlds: loadedWorlds });
	}
	async loadHeroes() {
		const heroesResponse = await DB.getHeroes();
		const loadedHeroes = heroesResponse.heroes.map((hero) => {
			return {
				id: hero.id,
				worldId: hero.world_id,
				name: hero.name,
				type: hero.type,
				strengths: hero.strengths,
				weakness: hero.weakness,
				power: hero.power_level,
				image: hero.image_url,
				avatarImage: hero.arena_avatar_url,
			};
		});
		this.setState({ heroes: loadedHeroes });
	}

	startGame() {
		this.setState({ shouldGameBegin: true });
	}

	enterAdminPanel() {
		this.setState({ shouldEnterAdminPanel: true });
	}

	backToWelcomePage() {
		this.setState({ shouldEnterAdminPanel: false, shouldGameBegin: false });
	}

	render() {
		//Start the Game
		if (this.state.shouldGameBegin)
			return (
				<Game
					backToWelcomePage={this.backToWelcomePage}
					heroes={this.state.heroes}
					worlds={this.state.worlds}
				/>
			);
		else if (this.state.shouldEnterAdminPanel) {
			return (
				<AdminPanel
					addInstance={this.addInstance}
					updateInstance={this.updateInstance}
					deleteInstance={this.deleteInstance}
					startGame={this.startGame}
					heroes={this.state.heroes}
					worlds={this.state.worlds}
				/>
			);
		}
		return (
			<WelcomePage
				submitLogin={this.submitLogin}
				isUserAuthorized={this.state.isUserAuthorized}
				enterAdmin={this.enterAdminPanel}
				startGame={this.startGame}
			/>
		);
	}

	componentDidMount() {
		this.loadWorlds();
		this.loadHeroes();
	}
}
