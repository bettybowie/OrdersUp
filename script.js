// Declare variables
var recipeUrl = "www.themealdb.com/api/json/v1/1/filter.php?c=" + category "&parameter";
var category = 'dropdown list selection';


// if an option from dropdown list is selected and the button is clicked, showRecipe();




var showRecipe = function (category) {
    
    fetch(recipeUrl)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
            } else {
                alert('Error' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to MealDB');
        })
}