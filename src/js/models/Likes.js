export default class Likes {
    constructor () {
        this.likes = [];
    }
    
    addLike(id,title,author,img){
        const like = { id, title, author, img}
        this.likes.push(like);
        
        // Persist data
        this.persistData();
        console.log(this.likes.length);

        return like;
    }
    
    deleteLike(id){
        const index = this.likes.findIndex(like => like.id === id);
        // [2,4,8] splice(1,1) returns 4, original array = [2,8]
        // [2,4,8] spice(1,2) returns 4, original array = [2,4,8]
        this.likes.splice(index, 1);
        
        // Persist data
        this.persistData();
        console.log(this.likes.length);
        
    }

    isLiked(id){
        return this.likes.findIndex(el=> el.id === id) !== -1;
    }

    getNumLikes(){
        return this.likes.length;
    }

    persistData(){
        localStorage.setItem("likes",JSON.stringify(this.likes));
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));

        // Restoring likes from localStorage
        if(storage) this.likes = storage;
    }
}