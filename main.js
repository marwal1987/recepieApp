// --- Viktors event listener och dom manipulation ---

// let idCount = 2;

// const recipeListData = [
// 	{
// 		id: 1,
// 		title: "Meatballs and potatoes",
// 		ingredients: "Meatballs, potatoes",
// 		instructions: "Fry the meatballs and potatoes.",
// 		image: "potatis-köttbullar",
// 	},
// ];

// const form = document.getElementById("form");

// form.addEventListener("submit", function (event) {
// 	event.preventDefault();
// 	const inputTitle = document.getElementById("input-title")
// 	const inputIngredients = document.getElementById("input-ingredients")
// 	const inputInstructions = document.getElementById("input-instructions")
// 	const inputImage = document.getElementById("input-image")
// 	if (inputTitle.value != "" && inputIngredients.value != "" && inputInstructions.value != "" && inputImage.value != "") {
// 		const newRecipe = {
// 			id: idCount++,
// 			title: inputTitle.value,
// 			ingredients: inputIngredients.value,
// 			instructions: inputInstructions.value,
// 			image: inputImage.value,
// 		};
// 		recipeListData.push(newRecipe);
// 		inputTitle.value = "";
// 		inputIngredients.value = "";
// 		inputInstructions.value = "";
// 		inputImage.value = "";
// 		console.log(recipeListData);
// 	} else {
// 		const newWarning = document.getElementById("input-warning");
// 		newWarning.style.color = "red";
// 		newWarning.innerText = "Please fill in all fields";
// 	}
// });
