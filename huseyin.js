let idCount = 2;

const recipeListData = [
  {
    id: 1,
    title: "Meatballs and potatoes",
    ingredients: "Meatballs, potatoes",
    instructions: "Fry the meatballs and potatoes.",
    image: "potatis-köttbullar",
  },
];

// --- Viktors event listener och dom manipulation ---

const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const inputTitle = document.getElementById("input-title");
  const inputIngredients = document.getElementById("input-ingredients");
  const inputInstructions = document.getElementById("input-instructions");
  const inputImage = document.getElementById("input-image");
  if (
    inputTitle.value != "" &&
    inputIngredients.value != "" &&
    inputInstructions.value != "" &&
    inputImage.value != ""
  ) {
    const newRecipe = {
      id: idCount++,
      title: inputTitle.value,
      ingredients: inputIngredients.value,
      instructions: inputInstructions.value,
      image: inputImage.value,
    };
    recipeListData.push(newRecipe);
    displayRecipeInList(newRecipe); // La till
    inputTitle.value = "";
    inputIngredients.value = "";
    inputInstructions.value = "";
    inputImage.value = "";
    console.log(recipeListData);
  } else {
    const newWarning = document.getElementById("input-warning");
    newWarning.style.color = "red";
    newWarning.innerText = "Please fill in all fields";
  }
});

// -- Martins DOM och Event ---
// Function to display a recipe in the list
function displayRecipeInList(recipe) {
  const recipeList = document.getElementById("recipes");
  const listItem = document.createElement("li");
  listItem.className = "list-item";
  listItem.setAttribute("data-id", recipe.id);
  listItem.innerHTML = `
      <p class="list-item-title">${recipe.title}</p>
      <p class="list-item-rating">Rating 5</p>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
  `;
  recipeList.appendChild(listItem);

  // Add click event to show recipe details
  listItem.addEventListener("click", function () {
    displayRecipeDetails(recipe);
  });
}

// Function to display recipe details
function displayRecipeDetails(recipe) {
  const displayTitle = document.getElementById("display-title");
  const displayIngredients = document.getElementById("display-ingredients");
  const displayInstructions = document.getElementById("display-instructions");
  const displayImage = document.querySelector(".inner-container-row img");

  displayTitle.innerText = recipe.title;
  displayIngredients.innerText = recipe.ingredients;
  displayInstructions.innerText = recipe.instructions;
  displayImage.src = `images/${recipe.image}.png`;
  displayImage.alt = recipe.title;
}
// TODO: Make Edit and Delete buttons work - Huseyin
// Funktion för att radera ett recept
function deleteRecipe(id) {
  const recipeIndex = recipeListData.findIndex((recipe) => recipe.id === id);
  if (recipeIndex !== -1) {
    recipeListData.splice(recipeIndex, 1); // Ta bort receptet från arrayen
    const recipeListItem = document.querySelector(`li[data-id="${id}"]`);
    if (recipeListItem) {
      recipeListItem.remove(); // Ta bort listobjektet från DOM
    }
  }
}

// Funktion för att redigera ett recept
function editRecipe(id) {
  const recipe = recipeListData.find((recipe) => recipe.id === id);
  if (recipe) {
    // Fyll i formuläret med det nuvarande receptets detaljer
    document.getElementById("input-title").value = recipe.title;
    document.getElementById("input-ingredients").value = recipe.ingredients;
    document.getElementById("input-instructions").value = recipe.instructions;
    document.getElementById("input-image").value = recipe.image;

    // Tillfälligt ändra formulärets beteende för att uppdatera det befintliga receptet
    form.onsubmit = function (event) {
      event.preventDefault();

      // Uppdatera receptobjektet med nya värden
      recipe.title = document.getElementById("input-title").value;
      recipe.ingredients = document.getElementById("input-ingredients").value;
      recipe.instructions = document.getElementById("input-instructions").value;
      recipe.image = document.getElementById("input-image").value;

      // Uppdatera listobjektet i DOM
      const recipeListItem = document.querySelector(`li[data-id="${id}"]`);
      if (recipeListItem) {
        recipeListItem.querySelector(".list-item-title").innerText =
          recipe.title;
      }

      // Återställ formuläret till standardbeteende efter uppdatering
      form.onsubmit = null;
      form.reset();
      console.log(recipeListData);
    };
  }
}

// Delegera eventlyssnare till redigera- och raderaknappen med hjälp av eventdelegering
document.getElementById("recipes").addEventListener("click", function (event) {
  const target = event.target;
  const listItem = target.closest(".list-item");
  if (!listItem) return;

  const recipeId = parseInt(listItem.getAttribute("data-id"), 10);

  if (target.classList.contains("delete-btn")) {
    deleteRecipe(recipeId);
  } else if (target.classList.contains("edit-btn")) {
    editRecipe(recipeId);
  }
});
