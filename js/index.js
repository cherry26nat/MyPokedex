const initialApp = async () => {
  let dataPokemons = null;

  elementListCard.innerHTML = "";

  dataPokemons = await fetchApi(`${config.apiUrl}/pokemon`);

  const returnPokemonsWithInfo = await dataPokemons.results.map(
    async (pokemon) => await fetchPokemon(pokemon.url)
  );

  const resultPokemonsWithInfo = await Promise.all(returnPokemonsWithInfo);

  console.log(resultPokemonsWithInfo);

  resultPokemonsWithInfo.map((pokemon) => renderPokemonInfo(pokemon));
};

initialApp();
