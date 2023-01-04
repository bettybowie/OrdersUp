
// Declare variables
var mealUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
var drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
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
var mealListResults = [];


// function to fetch API and display results 
var showRecipe = function (choice) {
    var recipeUrl = mealUrl + choice;

    fetch(recipeUrl)
        
        .then(function(response) {
            if (response.ok) {
                console.log(response);

                response.json().then(function(data){
                    console.log(data);
                    mealListResults = [];
                    mealResults.innerHTML = `
                    <h2>Are you in the mood for any of these meals? <h2> `
                    for (i = 0; i < 5; i++) {
                        let mealName = data.meals[i].strMeal;
                        let mealImg = data.meals[i].strMealThumb;

                        let meal = {
                            mealName: mealName,
                            mealImg : mealImg 
                        };

                        mealListResults.push(meal);

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
                        headerEl.innerHTML = `
                        <h3> ${mealName}</h3>
                        <button id="meal-${i}" class="button save-meal">Save</button>
                        `
                        mealResults.append(cardEl);
                        cardEl.append(mealImgDiv);
                        cardEl.append(cardEle);
                        cardEle.append(headerEl);
                        mealImgDiv.append(mealImgFig);
                        mealImgDiv.append(mealImage);
                    
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

// function to save meals to local storage
mealResults.addEventListener('click', function(e) {
    if (!e.target.matches('.save-meal')) {
        return;
    };

    var saveMealIndex = parseInt(e.target.getAttribute('id').split('-')[1]);
    console.log(saveMealIndex);

    var savedMeal = mealListResults[saveMealIndex];
    var savedMealArray = JSON.parse(localStorage.getItem('meals'))|| [];

    console.log(savedMeal);
    savedMealArray.push(savedMeal);

    localStorage.setItem('meals', JSON.stringify(savedMealArray));
})

// function to dislay saved meals from local storage
function displaySaveList () {
    var savedMealArray = JSON.parse(localStorage.getItem('meals'))|| [];

    for (var i = 0; i < savedMealArray.length; i++) {
        let mealName = savedMealArray[i].mealName;
        let mealImg = savedMealArray[i].mealImg;

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
        headerEl.innerHTML = `
        <h3> ${mealName}</h3>
        `
        savedPage.append(cardEl);
        cardEl.append(mealImgDiv);
        cardEl.append(cardEle);
        cardEle.append(headerEl);
        mealImgDiv.append(mealImgFig);
        mealImgDiv.append(mealImage);
    }
}

// function to fetch API and display result
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
                    randomDrink.append(drinkDiv);

                })
            } else {
                alert('Error' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to CocktailDB');
        })
}

// function to display results after submit button
var formSubmitHandler = function(e) {
    e.preventDefault();
        
    var choice = category.value;
        
    if (choice === '') {
        alert('Please pick a category!')
    } else {
        homePage.style.display = 'none';
        resultPage.style.display = 'flex';
        savedPage.style.display = 'none';
        showRecipe(choice);
        showDrink();
        randomDrink.innerHTML = '';
    };
}

// event listener to submit button
categorySelect.addEventListener('submit', formSubmitHandler);


// event listener to homepage button
backHomeBtn.addEventListener('click', function(e) {
    homePage.style.display = 'flex';
    resultPage.style.display = 'none';
    savedPage.style.display = 'none';    
})

// event listener to saved page button
savePgeBtn.addEventListener('click', function(e) {
    homePage.style.display = 'none';
    resultPage.style.display = 'none';
    savedPage.style.display = 'flex';
    savedPage.innerHTML = `<div><h2>Archived Meals</h2></div>`;
    displaySaveList();
})

