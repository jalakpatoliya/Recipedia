import axios from "axios";
import  {key} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe (){
        try {
            const res           = await axios(`https://www.food2fork.com/api/get?key=${key[6]}&rId=${this.id}`);
            console.log(res);
            this.title          = res.data.recipe.title; 
            this.author         = res.data.recipe.publisher;
            this.img            = res.data.recipe.image_url;
            this.src            = res.data.recipe.source_url;
            this.ingredients    = res.data.recipe.ingredients;
        } catch (error) {   
            console.error(error);
        }
    }

    calcTime  ()  {
        // Assuming each 3 ingredient takes 15 min
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time     = periods*15; 
    }

    calcServings(){
        this.servings = 4;
    }

}