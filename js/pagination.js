const itemPrev = document.querySelector("#item-prev");
const itemNext = document.querySelector("#item-next");

itemPrev.addEventListener("click", () => prevPokemon());

itemNext.addEventListener("click", () => nextPokemon());

document.addEventListener("keydown", (e) => {
  const keyCode = e.keyCode;

  if (keyCode === 37) {
    prevPokemon();
  }

  if (keyCode === 39) {
    nextPokemon();
  }
});

const prevPokemon = () =>
  (location.href = `/info.html?id=${
    +pokemonId <= 1 ? config.maxPokeApipokemons : +pokemonId - 1
  }`);

const nextPokemon = () =>
  (location.href = `/info.html?id=${
    +pokemonId >= config.maxPokeApipokemons ? 1 : +pokemonId + 1
  }`);
