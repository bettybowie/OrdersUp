// Declare variables
var mealUrl = "http://www.themealdb.com/api/json/v1/1/filter.php?c=";
var drinkUrl = "http://www.thecocktaildb.com/api/json/v1/1/random.php";
var category = document.getElementById('category');
var categorySelect = document.querySelector('.select');

// if an option from dropdown list is selected and the button is clicked, showRecipe();

var formSubmitHandler = function(e) {
    e.preventDefault();

    var choice = category.value;

    if (choice ==="") {
        alert('Please pick a category!')
    } else {
        showRecipe(choice);
        showDrink();
    };
}



categorySelect.addEventListener('submit', formSubmitHandler);


var showRecipe = function (choice) {
    var recipeUrl = mealUrl + choice;

    fetch(recipeUrl)
        
        .then(function(response) {
            if (response.ok) {
                console.log(response);

                response.json().then(function(data){
                    console.log(data);
                })
            } else {
                alert('Error' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to MealDB');
        })
}

var showDrink = function() {
    
    fetch(drinkUrl)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                })
            } else {
                alert('Error' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to CocktailDB');
        })
}