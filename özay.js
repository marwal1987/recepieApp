let idCount = 2;
const recipeListData = [
	{
		id: 1,
		title: "Fried Meatballs and Potatoes",
		ingredients: "Meatballs, potatoes, salt, pepper, oil",
		instructions:
			"Heat oil in a frying pan over medium heat and fry the meatballs until they are browned and cooked through, turning occasionally. In the same pan, add more oil if needed, and fry the potatoes until golden and crispy.",
		image: "meatballs-potatoes",
		votes: [],
	},
	{
		id: 2,
		title: "Spaghetti Carbonara",
		ingredients: "Spaghetti, eggs, pancetta, Parmesan cheese, black pepper",
		instructions:
			"Cook spaghetti. Fry pancetta until crisp. Mix eggs and cheese in a bowl. Combine everything and season with black pepper.",
		image: "spaghetti-carbonara",
		votes: [],
	},
	{
		id: 3,
		title: "Chicken Caesar Salad",
		ingredients: "Chicken breast, Romaine lettuce, Caesar dressing, croutons, Parmesan cheese",
		instructions:
			"Grill the chicken, slice it. Toss Romaine lettuce with Caesar dressing. Top with chicken, croutons, and Parmesan cheese.",
		image: "caesar-salad",
		votes: [],
	},
	{
		id: 4,
		title: "Tacos al Pastor",
		ingredients: "Pork, pineapple, corn tortillas, onion, cilantro, lime",
		instructions:
			"Marinate pork in spices, cook with pineapple. Serve on corn tortillas with onion, cilantro, and lime.",
		image: "tacos-al-pastor",
		votes: [],
	},
];

// Initialize and display the recipes when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  recipeListData.forEach((recipe) => {
    displayRecipeInList(recipe);
  });
});

// document.addEventListener("DOMContentLoaded", function () {
// 	recipeListData.push(
// 		{
// 			id: 5,
// 			title: "Fried Meatballs and Potatoes",
// 			ingredients: "Meatballs, potatoes, salt, pepper, oil",
// 			instructions:
// 				"Heat oil in a frying pan over medium heat and fry the meatballs until they are browned and cooked through, turning occasionally. In the same pan, add more oil if needed, and fry the potatoes until golden and crispy.",
// 			image: "meatballs-potatoes",
// 			votes: [],
// 		},
// 		{
// 			id: 6,
// 			title: "Spaghetti Carbonara",
// 			ingredients: "Spaghetti, eggs, pancetta, Parmesan cheese, black pepper",
// 			instructions:
// 				"Cook spaghetti. Fry pancetta until crisp. Mix eggs and cheese in a bowl. Combine everything and season with black pepper.",
// 			image: "spaghetti-carbonara",
// 			votes: [],
// 		},
// 		{
// 			id: 7,
// 			title: "Chicken Caesar Salad",
// 			ingredients: "Chicken breast, Romaine lettuce, Caesar dressing, croutons, Parmesan cheese",
// 			instructions:
// 				"Grill the chicken, slice it. Toss Romaine lettuce with Caesar dressing. Top with chicken, croutons, and Parmesan cheese.",
// 			image: "caesar-salad",
// 			votes: [],
// 		},
// 		{
// 			id: 8,
// 			title: "Tacos al Pastor",
// 			ingredients: "Pork, pineapple, corn tortillas, onion, cilantro, lime",
// 			instructions:
// 				"Marinate pork in spices, cook with pineapple. Serve on corn tortillas with onion, cilantro, and lime.",
// 			image: "tacos-al-pastor",
// 			votes: [],
// 		}
// 	);

// 	recipeListData.forEach(recipe => {
// 		displayRecipeInList(recipe);
// 	})
// });

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
      votes: [], // Initialize votes array (ozay)
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

// Calculate the average rating and total votes (ozay)
  const averageRating = calculateAverageRating(recipe);
  const totalVotes = recipe.votes?.length || 0;  

  listItem.innerHTML = `
      <p class="list-item-title">${recipe.title}</p>
      <p class="list-item-rating">Rating: ${averageRating} (${totalVotes} votes)</p>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
  `;
  recipeList.appendChild(listItem);

  // Add click event to show recipe details
  listItem.addEventListener("click", function() {
      displayRecipeDetails(recipe);
  });
}


// Function to update the list item rating after voting (ozay)
function updateRecipeListItem(recipe) {
  const listItem = document.querySelector(`li[data-id='${recipe.id}']`);
  if (listItem) {
    // Update the innerHTML of the existing list item with the new rating data
    const averageRating = calculateAverageRating(recipe);
    const totalVotes = recipe.votes?.length || 0;
    listItem.querySelector(
      ".list-item-rating"
    ).innerText = `Rating: ${averageRating} (${totalVotes} votes)`;
  }
}



// Function to display recipe details
function displayRecipeDetails(recipe) {
  const displayTitle = document.getElementById("display-title");
  const displayIngredients = document.getElementById("display-ingredients");
  const displayInstructions = document.getElementById("display-instructions");
  const displayImage = document.querySelector(".inner-container-row img");
  const ratingContainer = document.getElementById("rating-container"); //ozay

  displayTitle.innerText = recipe.title;
  displayIngredients.innerText = recipe.ingredients;
  displayInstructions.innerText = recipe.instructions;
  displayImage.src = `images/${recipe.image}.png`;
  displayImage.alt = recipe.title;


// Display the star rating system (ozay)
  ratingContainer.innerHTML = `
    <div class="stars">
      ${[1, 2, 3, 4, 5]
        .map(
          (star) => `
        <span class="star" data-value="${star}">&#9733;</span>
      `
        )
        .join("")}
    </div>
    <p>Average Rating: ${calculateAverageRating(recipe)} (${recipe.votes?.length || 0} votes)</p>
  `;

  // Add click event for each star (ozay)
  document.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("click", function () {
      const ratingValue = parseInt(this.getAttribute("data-value"));
      addVote(recipe.id, ratingValue);
      displayRecipeDetails(recipe); // Refresh details to show updated rating
      updateRecipeListItem(recipe); // Update list item with new rating
    });
  });
}

// Function to add a vote to a recipe (ozay)
function addVote(recipeId, vote) {
  const recipe = recipeListData.find((r) => r.id === recipeId);
  if (recipe) {
    recipe.votes = recipe.votes || []; // Initialize votes array if it doesn't exist
    recipe.votes.push(vote);
    localStorage.setItem("recipeListData", JSON.stringify(recipeListData)); // Save to localStorage
  }
}

// Function to calculate average rating (ozay)
function calculateAverageRating(recipe) {
  if (!recipe.votes || recipe.votes.length === 0) return 0;
  const sum = recipe.votes.reduce((a, b) => a + b, 0);
  return (sum / recipe.votes.length).toFixed(1);
}



// TODO: Basic styling - Özay

// TODO: Add more recipes in mockdata - Viktor

// TODO: Make Edit and Delete buttons work - Huseyin
