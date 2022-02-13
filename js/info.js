const elementPokemonId = document.querySelector("#pokemonId");
const elementPokemonName = document.querySelector("#pokemonName");
const elementPokemonImage = document.querySelector("#pokemonImage");
const elementWrapperBgPokemon = document.querySelector("#wrapperBgPokemon");

const pokemonId = getParams("id");

const getPokemon = async () => {
  const pokemon = await fetchPokemon(`${config.apiUrl}/pokemon/${pokemonId}`);
  console.log(pokemon.detail.types[0].type.name);
  console.log(pokemon);

  elementPokemonId.innerHTML = `#${pokemon.id}`;
  elementPokemonName.innerHTML = `${pokemon.name}`;
  elementPokemonImage.src = getImagePokemon(
    pokemon.detail,
    "large",
    localStorage.getItem("imageType")
  );

  //GET BACKGROUNDS BY types
  const pokemonsTypes = pokemon.detail.types.map(
    (type_) => dataByType[type_.type.name]
  );

  setBackgroundBody(pokemonsTypes, elementWrapperBgPokemon);

  const descriptionES = getDescription(pokemon, "en");

  console.log(descriptionES);
};

getPokemon();
