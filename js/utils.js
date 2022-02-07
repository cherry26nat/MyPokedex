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

//RENDER POKEMON IN CARD
const renderPokemonInfo = (pokemon) => {
  elementListCard.innerHTML += `<a  href="info.html?id=${pokemon.id}" >
	<div class="card ${colorType(pokemon.detail.types[0].type.name)}">
	<div class="pokemon-img">
		<img src="${getImagePokemon(
      pokemon.detail,
      "small",
      localStorage.getItem("imageType")
    )}" alt="pokemon" />
	</div>
	<div class="pokemon-info">
	<h3>${pokemon.name}</h3>
	<div class="wrapper-species">
	${mapRenderPokemonType(pokemon.detail.types)}
	</div>
	</div>
	</div>
</a>`;
};

//RENDER TAGS POKEMON TYPES
const mapRenderPokemonType = (types) => {
  return types.map(
    (pokemontype) =>
      `<div class="pokemon-type">${
        dataByType[pokemontype.type.name].name
      }</div>`
  );
};

//Return color pokemon type
const colorType = (typePokemon) => dataByType[typePokemon].class;

//GET IMAGE POKEMON
const getImagePokemon = (pokemon, sizeImage = "small", imageType = "3d") => {
  if (!pokemon) return null;

  const serverImageApi =
    imageType === "2d" ? config.serverPokemonPuntoCom : config.serverSerebi;

  if (pokemon.id > serverImageApi["maxPokemons"]) {
    return pokemon.sprites.front_default
      ? pokemon.sprites.front_default
      : "./images/pokeball2.png";
  }

  const _sizeImage = sizeImage === "small" ? "urlImgSmall" : "urlImgLarge";

  const urlImageExtended = serverImageApi[_sizeImage];

  if (pokemon.id < 10) {
    return `${urlImageExtended}/00${pokemon.id}.png`;
  }
  if (pokemon.id < 100) {
    return `${urlImageExtended}/0${pokemon.id}.png`;
  } else {
    return `${urlImageExtended}/${pokemon.id}.png`;
  }
};

//ADD CLASS NAMES
const addClassName = (element, className) => element.classList.add(className);

//REMOVE CLASS NAMES
const removeClassName = (element, className) =>
  element.classList.remove(className);
