const elementPokemonId = document.querySelector("#pokemonId");
const elementPokemonName = document.querySelector("#pokemonName");
const elementPokemonImage = document.querySelector("#pokemonImage");
const elementWrapperBgPokemon = document.querySelector("#wrapperBgPokemon");
const elementPokemonDescription = document.querySelector("#pokemonDescription");
const elementPokemonType = document.querySelector("#pokemonType");
const elementItemSpeech = document.querySelector("#item-speech");
const elementWrapperStats = document.querySelector("#wrapper-stats");

const pokemonId = getParams("id");

const getPokemon = async () => {
  try {
    const synth = window.speechSynthesis;
    const pokemon = await fetchPokemon(`${config.apiUrl}/pokemon/${pokemonId}`);
    synth.cancel();

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

    const descriptionES = getDescription(pokemon, "es");
    console.log(descriptionES);

    elementPokemonDescription.innerHTML = `${descriptionES}`;

    elementItemSpeech.addEventListener("click", () =>
      speechVoice("es", `${pokemon.name}. ${descriptionES}`)
    );

    speechVoice("es", `${pokemon.name}. ${descriptionES}`);

    elementPokemonType.innerHTML = `${mapRenderPokemonType(
      pokemon.detail.types
    )}`;
    console.log(pokemon);

    mapRenderStats(elementWrapperStats, pokemon.detail.stats);
  } catch (e) {
    console.log("error info:", e);
  }
};

getPokemon();
