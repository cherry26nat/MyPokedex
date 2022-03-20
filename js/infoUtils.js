const setBackgroundBody = (pokemonTypes, elementWrapper) => {
  const amountPokemonTypes = pokemonTypes.length;
  const elementStyle = elementWrapper.style;

  switch (amountPokemonTypes) {
    case 1: {
      const colorOne = pokemonTypes[0].color_solid;
      elementStyle.background = `linear-gradient(to right top, ${colorOne}, ${colorOne})`;
      break;
    }

    case 2: {
      const colorOne = pokemonTypes[0].color_solid;
      const colorTwo = pokemonTypes[1].color_solid;
      elementStyle.background = `linear-gradient(to right top, ${colorOne}, ${colorTwo})`;
      break;
    }
    case 3: {
      const colorOne = pokemonTypes[0].color_solid;
      const colorTwo = pokemonTypes[1].color_solid;
      const colorThree = pokemonTypes[2].color_solid;
      elementStyle.background = `linear-gradient(to right top, ${colorOne}, ${colorTwo},${colorThree})`;
      break;
    }
    default: {
      const colorOne = pokemonTypes[0].color_solid;
      elementStyle.background = `linear-gradient(to right top, ${colorOne}, ${colorOne})`;
      break;
    }
  }
};

//GET DESCRIPTION
const getDescription = (pokemon, languageCode) => {
  const descriptionEN = pokemon.species.flavor_text_entries.find(
    (description) => description.language.name === languageCode
  ).flavor_text;
  return descriptionEN;
};

const speechVoice = (languageCode, description) => {
  const utterance = new SpeechSynthesisUtterance(description);
  utterance.lang = languageCode;
  utterance.volume = 1;
  speechSynthesis.speak(utterance);
  utterance.addEventListener("start", () =>
    elementItemSpeech.classList.add("animate-speech")
  );
  utterance.addEventListener("end", () =>
    elementItemSpeech.classList.remove("animate-speech")
  );
};

const mapRenderStats = (elementRender, stats) => {
  return stats.map(({ base_stat, stat }) => {
    const statConfig_ = statsConfig[stat.name] || {};
    console.log(statConfig_);
    console.log(stats);

    return (elementRender.innerHTML += `
    <div class="item">
    <p>${statConfig_.name}</p>
      <div class="bar">
       <span>${base_stat}%</span>
        <div class="bar-color ${statConfig_.type_progress}" style="width: ${base_stat}%"></div>
        </div>
      </div> `);
  });
};

const getIdPokemon = (url) =>
  url
    .split("/")
    .filter((url) => url)
    .pop();

const getAllEvolutionsPokemon = (evolutions) => {
  evolutionsPokemon.push(getIdPokemon(evolutions.species.url));

  const getEvolution = async (evolves_to) => {
    if (evolves_to.length > 1) {
      const PokemonsIds = evolves_to.map((evolve) =>
        getIdPokemon(evolve.species.url)
      );

      evolutionsPokemon.push(PokemonsIds);
    } else {
      if (evolves_to[0]) {
        evolutionsPokemon.push(getIdPokemon(evolves_to[0].species.url));
        getEvolution(evolves_to[0].evolves_to);
      }
    }
  };

  getEvolution(evolutions.evolves_to);
};

const setEvolutionElement = (pokemon) => `
<div class="item-img-evolution">
<a href="../info.html?id=${pokemon.id}" class="text-center">
  <img
    class="img-pokemon-evolution img-responsive"
    src="${getImagePokemon(
      pokemon.detail,
      "small",
      localStorage.getItem("imageType")
    )}"
    alt="pokemon"
/></a>
<h6 class="text-center name-pokemon">${pokemon.name}</h6>
</div>`;
