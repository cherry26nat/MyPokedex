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
		<img  class="img-pokemon-list" src="${getImagePokemon(
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

//Return color pokemon type
const colorType = (typePokemon = "normal") => dataByType[typePokemon].class;

//RENDER TAGS POKEMON TYPES
const mapRenderPokemonType = (types, activeBg = false) => {
  return types.map(
    (pokemontype) =>
      `<div class="pokemon-type ${
        activeBg && colorType(pokemontype.type.name)
      } ">${dataByType[pokemontype.type.name].name}</div>`
  );
};

console.log("color-type-name>>>", colorType("fire"));

//GET IMAGE POKEMON
const getImagePokemon = (pokemon, sizeImage = "small", imageType = "tipo4") => {
  if (!pokemon) return null;

  const defaultOption1Image =
    pokemon.sprites.other["official-artwork"].front_default;

  switch (imageType) {
    case "tipo1":
      return defaultOption1Image || pokemon.sprites.front_default;
    case "tipo2":
      return pokemon.sprites.other.dream_world.front_default
        ? pokemon.sprites.other.dream_world.front_default
        : defaultOption1Image
        ? defaultOption1Image
        : pokemon.sprites.front_default;
    case "tipo3":
      return pokemon.sprites.other.home.front_default
        ? pokemon.sprites.other.home.front_default
        : defaultOption1Image
        ? defaultOption1Image
        : pokemon.sprites.front_default;
    case "tipo4":
      return getImageServerSerebi(pokemon, sizeImage);
    default:
      return pokemon.sprites.front_default;
  }
};

const getImageServerSerebi = (pokemon, sizeImage) => {
  const defaultOption1Image =
    pokemon.sprites.other["official-artwork"].front_default;

  if (pokemon.id > config.serverSerebi["maxPokemons"]) {
    return defaultOption1Image
      ? defaultOption1Image
      : pokemon.sprites.front_default
      ? pokemon.sprites.front_default
      : "./images/pokeball2.png";
  }

  const _sizeImage = sizeImage === "small" ? "urlImgSmall" : "urlImgLarge";

  const urlImageExtended = config.serverSerebi[_sizeImage];

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

//GET DATA FROM URL
const getParams = (param) => {
  const url = new URL(location.href);
  return url.searchParams.get(param);
};

const isVisibleSpinner = (elementSpinner, isVisible = true) => {
  if (isVisible) {
    elementSpinner.classList.add("visible");
    elementSpinner.classList.remove("none");
  } else {
    elementSpinner.classList.remove("visible");
    elementSpinner.classList.add("none");
  }
};

//**ACTIVE BUTTONS SPINNER**
const activeSpinnerInButton = (
  btnElement,
  isVisible = true,
  defaultText,
  loadingText = ` <i class="fas fa-circle-notch spin" id="btnspinner"></i> Cargando...`
) => {
  //Spinner no visible
  if (!isVisible) {
    btnElement.disabled = false;
    return (btnElement.innerHTML = `<div>${defaultText}</div>`);
  }

  //Spinner visible
  btnElement.disabled = true;
  btnElement.innerHTML = `<div><span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      ${loadingText}</div>`;
};
