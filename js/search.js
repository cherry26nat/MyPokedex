const elementFormSearch = document.querySelector("#form-search");
const elementBtnSearch = document.querySelector("#btn-search");

elementFormSearch.addEventListener("submit", async (e) => {
	e.preventDefault();
	const valueSearch = document.querySelector("#data-search").value.toLowerCase().trim();

	console.log(valueSearch);

	if (valueSearch) {
		const response = await fetch(`${config.apiUrl}/pokemon/${valueSearch}`);

		if (!response.ok) {
			return (elementListCard.innerHTML = `<h3>No se encontro "${valueSearch}", intente con otro nombre o id por favor...</h3>`);
		}

		elementListCard.innerHTML = "";

		const pokemonDetail = await response.json();

		const pokemonSpecies = await fetchApi(pokemonDetail.species.url);

		const pokemonEvolutions = await fetchApi(pokemonSpecies.evolution_chain.url);

		const pokemonInfo = {
			id: pokemonDetail.id,
			name: pokemonDetail.name,
			detail: pokemonDetail,
			species: pokemonSpecies,
			evolutions: pokemonEvolutions,
		};

		renderPokemonInfo(pokemonInfo);
	} else {
		initialApp();
	}
});
