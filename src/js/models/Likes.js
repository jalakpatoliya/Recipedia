

export default class Likes {
    constructor () {
        this.likes = [];
    }
    
    addLike(id,title,author,img){
        const like = { id, title, author, img}
        this.likes.push(like);
        return like;
    }

    deleteLike(id){
        const index = this.likes.findIndex(like => like.id === id);
        // [2,4,8] splice(1,1) returns 4, original array = [2,8]
        // [2,4,8] spice(1,2) returns 4, original array = [2,4,8]
        this.likes.splice(index, 1);
    }

    isLiked(id){
        return this.likes.findIndex(el=> el.id === id) !== -1;
    }

    getNumLikes(){
        return this.likes.length;
    }
}