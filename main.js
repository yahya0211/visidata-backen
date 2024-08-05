const pokemonDropdown = document.getElementById("pokemon-dropdown");
const searchInput = document.getElementById("search");
const pokemonDetails = document.getElementById("pokemon-details");

// Fetch Pokémon data from API
async function fetchPokemonData() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}

// Populate dropdown list with Pokémon names
async function populateDropdown() {
  const pokemonList = await fetchPokemonData();
  if (!pokemonList) return;

  // Sort Pokémon list in ascending order by name
  pokemonList.sort((a, b) => a.name.localeCompare(b.name));

  // Populate dropdown
  pokemonDropdown.innerHTML = '<option value="">Select Pokémon</option>'; // Reset options
  pokemonList.forEach((pokemon) => {
    const option = document.createElement("option");
    option.value = pokemon.url;
    option.textContent = pokemon.name;
    pokemonDropdown.appendChild(option);
  });
}

// Display Pokémon details
async function displayPokemonDetails(url) {
  try {
    const response = await fetch(url);
    const pokemon = await response.json();
    pokemonDetails.innerHTML = `
            <h2>${pokemon.name.toUpperCase()}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Height: ${pokemon.height}</p>
            <p>Weight: ${pokemon.weight}</p>
            <p>Types: ${pokemon.types.map((type) => type.type.name).join(", ")}</p>
        `;
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
  }
}

// Handle dropdown change
pokemonDropdown.addEventListener("change", (event) => {
  const url = event.target.value;
  if (url) {
    displayPokemonDetails(url);
  } else {
    pokemonDetails.innerHTML = "";
  }
});

// Handle search input
searchInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  Array.from(pokemonDropdown.options).forEach((option) => {
    option.style.display = option.textContent.toLowerCase().includes(searchTerm) ? "block" : "none";
  });
});

// Initial population of dropdown list
populateDropdown();
