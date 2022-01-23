const config = {
	apiUrl: "https://pokeapi.co/api/v2",
	max_pokemons: 10220,
};

const colorsByType = {
	normal: "color-normal",
	grass: "color-grass",
	poison: "color-poison",
	flying: "color-flying",
	fire: "color-fire",
	water: "color-water",
	bug: "color-water",
	electric: "color-electric",
	ground: "color-ground",
	fairy: "color-fairy",
	fighting: "color-fighting",
	psychic: "color-psychic",
	rock: "color-rock",
	steel: "color-steel",
	ghost: "color-ghost",
	ice: "color-ice",
	dragon: "color-dragon",
	dark: "color-dark",
};

const statsConfig = {
	hp: {name: "Vida", type_progress: "bg-success"},
	attack: {name: "Ataque", type_progress: "bg-danger"},
	defense: {name: "Defensa", type_progress: "bg-primary"},
	"special-attack": {
		name: "Ataque especial",
		type_progress: "bg-danger progress-bar-striped",
	},
	"special-defense": {
		name: "Defensa especial",
		type_progress: "bg-pimary progress-bar-striped",
	},
	speed: {name: "Velocidad", type_progress: "bg-warning"},
};
