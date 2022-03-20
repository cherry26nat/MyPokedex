const elementPokemonId = document.querySelector("#pokemonId");
const elementPokemonName = document.querySelector("#pokemonName");
const elementPokemonImage = document.querySelector("#pokemonImage");
const elementWrapperBgPokemon = document.querySelector("#wrapperBgPokemon");
const elementPokemonDescription = document.querySelector("#pokemonDescription");
const elementPokemonType = document.querySelector("#pokemonType");
const elementItemSpeech = document.querySelector("#item-speech");
const elementWrapperStats = document.querySelector("#wrapper-stats");
const elementContainerEvolutions = document.querySelector(
  "#container-evolution"
);
const elementListEvolutions = document.querySelector("#list-evolutions");

const pokemonId = getParams("id");

let evolutionsPokemon = [];

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

    elementPokemonType.innerHTML += mapRenderPokemonType(
      pokemon.detail.types,
      true
    );
    console.log(pokemon);

    mapRenderStats(elementWrapperStats, pokemon.detail.stats);

    //VALIDATE AND SET EVOLUTIONS POKEMON
    if (
      !pokemon.evolutions ||
      pokemon.evolutions.chain.evolves_to.length <= 0
    ) {
      elementContainerEvolutions.classList.add("none");
    } else {
      getAllEvolutionsPokemon(pokemon.evolutions.chain);

      const getEvolutionsPokemon = evolutionsPokemon.map(async (pokemonIds) => {
        if (typeof pokemonIds !== "string") {
          const pokemons = await pokemonIds.map(
            async (pokemonId) =>
              await fetchPokemon(`${config.apiUrl}/pokemon/${pokemonId}`)
          );

          const resultPromises = await Promise.all(pokemons);

          return resultPromises;
        } else {
          const pokemon = await fetchPokemon(
            `${config.apiUrl}/pokemon/${pokemonIds}`
          );

          return pokemon;
        }
      });

      const resultPromisesEvolutionsPokemon = await Promise.all(
        getEvolutionsPokemon
      );

      resultPromisesEvolutionsPokemon.map((pokemon) => {
        if (pokemon.length > 1) {
          elementListEvolutions.innerHTML += `<div class="item-img-column">
                  ${pokemon.map((pokemon_) => setEvolutionElement(pokemon_))}
                </div>`;
        } else {
          elementListEvolutions.innerHTML += `<div class="item-img-row">
         ${setEvolutionElement(pokemon)}
          </div>`;
        }
      });
    }
  } catch (e) {
    console.log("error info:", e);
  }
};

getPokemon();
