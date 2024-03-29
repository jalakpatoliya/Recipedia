import axios from 'axios';
import { key } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async  getResults() {
        try {
            // let res = await axios(`https://www.food2fork.com/api/search?key=${key[2]}&q=${this.query}`);
            let res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}