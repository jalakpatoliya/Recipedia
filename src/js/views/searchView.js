import {elements} from "./base";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = '';
}
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

export const highlightSelected = id =>{
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(element => {
        element.classList.remove('results__link--active')
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
}

export const limitRecipeTitle = (title,limit=17) =>{
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0)
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe =>{
    let markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
        </a>
    </li>`;
    elements.searchResList.insertAdjacentHTML('beforeend',markup);
}
// type == 'prev' or 'next'
const createButton = (page, type) =>
    `<button class="btn-inline results__btn--${type}" data-goto="${type == 'prev' ? page - 1 : page + 1}">
            <span>Page ${type=='prev'?page-1:page+1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type=='prev'?'left':'right'}"></use>
            </svg>
        </button>
        `

const renderButtons = (page,results,resPerPage) =>{
    const pages = Math.ceil(results/resPerPage);
    let button;
    if (page==1 && pages>1) {
        // only button to next
        button = createButton(page,'next');
    } else if (page<pages) {
        //  both previous and next button
        button = `${createButton(page,'prev')}
                  ${createButton(page,'next')}`
    } else if (page == pages && pages > 1) {
        // only button to previous
        button = createButton(page,'prev');
    }

    elements.searchResPages.insertAdjacentHTML("afterbegin",button)
}

export const renderResults = (recipes,page=1,resPerPage=10) => {
    // render Results of current page
    let start = (page-1)*resPerPage;
    let end   = page * resPerPage;
    // console.log(recipes);
    recipes.slice(start,end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page,recipes.length,resPerPage);
}