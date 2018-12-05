import  uniqid  from "uniqid";

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count,unit,ingredient){
        const item = {
            id:uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);

        // persist data
        this.persistData();
        
        return item;
    }

    deleteItem(id){
        const index = this.items.findIndex( element => element.id === id);
        // [2,4,8] splice(1,1) returns 4, original array = [2,8]
        // [2,4,8] spice(1,2) returns 4, original array = [2,4,8]
        this.items.splice(index,1);

        // persist data
        this.persistData();
    }

    updateCount(id,newCount){
        this.items.find(el=>el.id===id).count = newCount;

        // persist data
        this.persistData();
    }

    persistData(){
        localStorage.setItem('List', JSON.stringify(this.items));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('List'));

        // Restoring likes from localStorage
        if (storage) this.items = storage;
    }
}