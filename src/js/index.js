// Global app controller
import  Search  from "./models/Search";
import  Recipe  from './models/Recipe';
import * as searchView from "./views/searchView";
import {elements,renderLoader,clearLoader} from "./views/base";

// console.log(elements);
/** Global state of app
 * -Search object
 * -Current recipe object
 * -Shopping list object
 * -Liked recipes
 */
const state = {}

// SEARCH CONTROLLER
const   conrtolSearch = async () => {
    // 1.Get query from view
    const query = searchView.getInput() 
    // console.log(query);
    if (query) {
        // 2.New search object and add to state 
        state.search = new Search(query);
        // console.log(state.search);
        // 3.Prepare UI for the  results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4.Search for recipes
            await state.search.getResults();
            // console.log(state.search);
            // 5.Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert(error)
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    conrtolSearch();
});

elements.searchResPages.addEventListener('click',e=>{
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage);
        console.log(goToPage);
    }
});


// RECIPE CONTROLLER
const controlRecipe = async () => {
    // Get id from url
    const id = window.location.hash.replace('#','');
    console.log(id);
    
    if (id) {
        // Prepare UI for changes

        // Create recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();
    
            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // Render recipe
            console.log(state.recipe);
        } catch (error) {
            alert(error)
        }
    }
};

// window.addEventListener('hashchange',controlRecipe);
['hashchange','load'].forEach(event => {
    window.addEventListener(event,controlRecipe);
});





