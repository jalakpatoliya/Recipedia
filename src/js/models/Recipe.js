import axios from 'axios';
import { key } from '../config';


export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      // const res = await axios(`https://www.food2fork.com/api/get?key=${key[2]}&rId=${this.id}`);
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      console.log(res);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.src = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      console.error(error);
    }
  }

  calcTime() {
    // Assuming each 3 ingredient takes 15 min
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon',
      'cups', 'pounds', 'kgs', 'gms', 'kilograms', 'grams'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'kg', 'gm', 'kg', 'gm'];

    const newIngredients = this.ingredients.map((el) => {
      // 1. Uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2. Remove paranthesis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3. Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');

      const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

      let objIng;
      if (unitIndex > -1) {
        // It has unit and count
        // ex:'4 1/2 cups' arrCount = ['4','1/2'] ---> eval('4 + 1/2') ---> 4.5
        const arrCount = arrIng.slice(0, unitIndex);
        console.log('indexjs:60: ', arrCount, arrCount.length); // TEsting

        let count;
        if (arrCount.length === 1) {
          //  there is unit and count is one
            count = parseFloat(arrIng[0]);
            console.log('recipejs:66: ', count);
            
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          // there is unit and count is more than one

          //
          const rectifiedUnitArray = [];
          arrIng.slice(0, unitIndex).forEach((element) => {
            if (!isNaN(parseFloat(element))) {
              rectifiedUnitArray.push(element) 
            }
          });
          count = eval(rectifiedUnitArray.join('+'));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' '),
        };
        console.log('recipejs:87: ', objIng);
        
        
      } else if (parseInt(arrIng[0], 10)) {
        // There is no unit bt 1st element is number
        const arr = arrIng[0].match(/[a-z]+|[^a-z]+/gi);
        const count =  eval(arr[0].replace('-', '+'));
          let unit = ' ';  
          if (arr.length == 1) { unit = '' } 
                        else { unit = arr[1] };
        objIng = {
            count,
          unit,
          ingredient: arrIng.slice(1).join(' '),
        };
          console.log('recipejs:102: ', objIng);
      } else if (unitIndex === -1) {
        // There is no unit and no number in 1st position.
        objIng = {
          count: 1,
          unit: '',
          ingredient,
        };
      }
      console.log('recipejs:111: ', objIng);
      return objIng;
    });

    this.ingredients = newIngredients;
    
  }

  updateServings(type) {
    // updating servings
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

    // updating ingredients
    console.log('recipejs:121: ', this.ingredients);
    this.ingredients.forEach((ingredient) => {
        ingredient.count = parseFloat(ingredient.count) * (newServings / this.servings);
      });
    this.servings = newServings;
  }
}
