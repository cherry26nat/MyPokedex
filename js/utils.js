const elementListCard = document.querySelector("#pokemon-list");

//*****FETCH API******
const fetchApi = async (url) => {
	const response = await fetch(url);

	if (!response.ok) return null;

	const dataJson = await response.json();
	return await dataJson;
};

const fetchPokemon = async (url) => {
	const pokemonDetail = await fetchApi(url);

	if (!pokemonDetail) return null;

	const pokemonSpecies = await fetchApi(pokemonDetail.species.url);

	const pokemonEvolutions = await fetchApi(pokemonSpecies.evolution_chain.url);

	return {
		id: pokemonDetail.id,
		name: pokemonDetail.name,
		detail: pokemonDetail,
		species: pokemonSpecies,
		evolutions: pokemonEvolutions,
	};
};

const renderPokemonInfo = (pokemon) => {
	console.log(pokemon);

	elementListCard.innerHTML += `<a  href="info.html?id=${pokemon.id}" >
	<div class="card">
	<div class="pokemon-img">
		<img src="${pokemon.detail.sprites.front_default}" alt="" srcset="" />
	</div>
	<div class="pokemon-info">
	<h2>${pokemon.name}</h2>
	<div class="wrapper-species">
	${mapRenderPokemonType(pokemon.detail.types)}
	</div>
	</div>
	</div>
</a>`;
};

const mapRenderPokemonType = (types) =>
	types.map(
		(pokemontype) =>
			`<div class="${colorType(pokemontype.type.name)}">${pokemontype.type.name}</div>`
	);

const colorType = (type) => colorsByType[type];
