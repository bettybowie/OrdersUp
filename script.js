// Declare variables
var mealUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
var drinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
var category = document.getElementById('category');
var categorySelect = document.querySelector('.select');
var homePage = document.querySelector('.homepage');
var resultPage = document.querySelector('.result-page');
var savedPage = document.querySelector('.saved-page');
var mealResults = document.querySelector('.meal-result');
var randomDrink = document.querySelector('.random-drink');
var saveMealBtn = document.querySelector('.save-meal');
var savePgeBtn = document.querySelector('#archiveBtn');
var backHomeBtn = document.querySelector('#back-home');

var showRecipe = function (choice) {
    var recipeUrl = mealUrl + choice;

    fetch(recipeUrl)
        
        .then(function(response) {
            if (response.ok) {
                console.log(response);

                response.json().then(function(data){
                    console.log(data);
                    mealResults.innerHTML = `
                    <h2>Are you in the mood for any of these meals? <h2> `
                    for (i = 0; i < 5; i++) {
                        let mealName = data.meals[i].strMeal;
                        let mealImg = data.meals[i].strMealThumb;

                        var cardEl = document.createElement('div');
                        cardEl.classList.add('card');
                        var mealImgDiv = document.createElement('div');
                        mealImgDiv.classList.add('card-image');
                        var mealImgFig = document.createElement('figure');
                        mealImgFig.classList.add('image');
                        var mealImage = document.createElement('img');
                        mealImage.src = mealImg;
                        var cardEle = document.createElement('div');
                        cardEle.classList.add('card-content');
                        var headerEl = document.createElement('div');
                        headerEl.classList.add('media-content');
                        var mealForm = document.createElement('form');
                        mealForm.classList.add('meal-form');
                        mealForm.innerHTML = `
                        <input type="text" value="${mealName}">
                        <button type="submit" class="button save-meal">Save</button>
                        `

                        mealResults.append(cardEl);
                        cardEl.append(mealImgDiv);
                        cardEl.append(cardEle);
                        cardEle.append(headerEl);
                        mealImgDiv.append(mealImgFig);
                        mealImgDiv.append(mealImage);
                        headerEl.append(mealForm);
                        
                        saveMealBtn.forEach(function(currentBtn){
                            currentBtn.addEventListener('click', function(e) {
                                console.log('o');
                            })
                          })
                    }
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
                    var drinkImg = data.drinks[0].strDrinkThumb;
                    var drinkName = data.drinks[0].strDrink;

                    var drinkDiv = document.createElement('div');
                    drinkDiv.classList.add('card');                    
                    drinkDiv.innerHTML = `
                    <h2> Here is a cocktail that you can pair with your meal. </h2>
                    <img src="${drinkImg}" alt="cocktail image"></img>
                    <h3> ${drinkName} </h3>
                    `
                    var button = document.createElement('button');
                    button.classList.add('button');
                    button.innerText = "save";

                    randomDrink.append(drinkDiv);
                    drinkDiv.append(button);

                })
            } else {
                alert('Error' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to CocktailDB');
        })
}

var formSubmitHandler = function(e) {
    e.preventDefault();
        
    var choice = category.value;
        
    if (choice ==="") {
        alert('Please pick a category!')
    } else {
        homePage.style.display = "none";
        resultPage.style.display = "block";
        savedPage.style.display = "none";
        showRecipe(choice);
        showDrink();
    };
}
        
categorySelect.addEventListener('submit', formSubmitHandler);

// saveMealBtn.addEventListener('submit', function(e) {
//     e.preventDefault();

//     console.log(drinkName);
// })

function displaySaveList () {

}

backHomeBtn.addEventListener('click', function(e) {
    e.preventDefault();

    homePage.style.display = "block";
    resultPage.style.display = "none";
    savedPage.style.display = "none";    
})

savePgeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    homePage.style.display = "none";
    resultPage.style.display = "none";
    savedPage.style.display = "block";
    displaySaveList();
})