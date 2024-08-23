let idCount = 2;

const recipeListData = [
	{
		id: 1,
		title: "Fried Meatballs and Potatoes",
		ingredients: "Meatballs, potatoes, salt, pepper, oil",
		instructions:
			"Heat oil in a frying pan over medium heat and fry the meatballs until they are browned and cooked through, turning occasionally. In the same pan, add more oil if needed, and fry the potatoes until golden and crispy.",
		image: "meatballs-potatoes",
	},
	{
		id: 2,
		title: "Spaghetti Carbonara",
		ingredients: "Spaghetti, eggs, pancetta, Parmesan cheese, black pepper",
		instructions:
			"Cook spaghetti. Fry pancetta until crisp. Mix eggs and cheese in a bowl. Combine everything and season with black pepper.",
		image: "spaghetti-carbonara",
	},
	{
		id: 3,
		title: "Chicken Caesar Salad",
		ingredients: "Chicken breast, Romaine lettuce, Caesar dressing, croutons, Parmesan cheese",
		instructions:
			"Grill the chicken, slice it. Toss Romaine lettuce with Caesar dressing. Top with chicken, croutons, and Parmesan cheese.",
		image: "caesar-salad",
	},
	{
		id: 4,
		title: "Tacos al Pastor",
		ingredients: "Pork, pineapple, corn tortillas, onion, cilantro, lime",
		instructions:
			"Marinate pork in spices, cook with pineapple. Serve on corn tortillas with onion, cilantro, and lime.",
		image: "tacos-al-pastor",
	}
];

// --- Viktors event listener och dom manipulation ---

const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
	event.preventDefault();
	const inputTitle = document.getElementById("input-title")
	const inputIngredients = document.getElementById("input-ingredients")
	const inputInstructions = document.getElementById("input-instructions")
	const inputImage = document.getElementById("input-image")
	if (inputTitle.value != "" && inputIngredients.value != "" && inputInstructions.value != "" && inputImage.value != "") {
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
  listItem.addEventListener("click", function() {
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

// TODO: Voting system - Özay
// TODO: Basic styling - Özay

// TODO: Add more recipes in mockdata - Viktor

// TODO: Make Edit and Delete buttons work - Huseyin
