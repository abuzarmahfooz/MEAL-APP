 // Get references to HTML elements
 const randomBtn = document.getElementById("randomBtn"); // Random Meal button
 const searchBtn = document.getElementById("searchBtn"); // Search button
 const searchInput = document.getElementById("searchInput"); // Search input field
 const mealDetails = document.getElementById("mealDetails"); // Container for displaying meal details
 const favoriteBtn = document.getElementById("favoriteBtn"); // Add to Favorites button

 // Add an event listener to the Random Meal button
 randomBtn.addEventListener("click", getRandomMeal);

 // Add an event listener to the Search button
 searchBtn.addEventListener("click", searchMeal);

 // Function to fetch and display a random meal
 function getRandomMeal() {
     // Send a request to the meal API to get a random meal
     fetch("https://www.themealdb.com/api/json/v1/1/random.php")
         .then((response) => response.json())
         .then((data) => displayMeal(data.meals[0])) // Display the retrieved meal
         .catch((error) => console.error(error));
 }

 // Function to search for a meal by name
 function searchMeal() {
     // Get the search term from the input field and remove any leading/trailing spaces
     const searchTerm = searchInput.value.trim();

     // Check if the search term is empty
     if (!searchTerm) {
         alert("Please enter a meal name to search.");
         return;
     }

     // Send a request to the meal API to search for meals by name
     fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
         .then((response) => response.json())
         .then((data) => {
             if (data.meals) {
                 displayMeal(data.meals[0]); // Display the first meal in the search results
             } else {
                 mealDetails.innerHTML = "Meal not found.";
             }
         })
         .catch((error) => console.error(error));
 }

 // Function to display meal details
 function displayMeal(meal) {
     if (!meal) return; // Return if there's no meal data

     // Create HTML content for the meal details
     const mealHtml = `
         <h2>${meal.strMeal}</h2>
         <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
         <p>${meal.strInstructions}</p>
     `;

     // Update the mealDetails container with the HTML content
     mealDetails.innerHTML = mealHtml;

     // Implement your favorite meal logic here
     favoriteBtn.addEventListener("click", () => {
         // You can add the meal to favorites using local storage or a database
         // Example: localStorage.setItem("favoriteMeal", JSON.stringify(meal));
         alert("Meal added to favorites.");
     });
 }