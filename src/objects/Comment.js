

class Comment {

    constructor(commentID, recipeID, authorID, commentContent, commentRating) {
        this.commentID = commentID;
        this.recipeID = recipeID;
        this.authorID = authorID;
        this.commentContent = commentContent;
        this.commentRating = commentRating;
    }

    getCommentID() {
        return this.commentID;
    }

    setCommentID(commentID) {
        this.commentID = commentID;
    }

    getRecipeID() {
        return this.recipeID;
    }
    
    setRecipeID(recipeID) {
        this.recipeID = recipeID;
    }
    
    getAuthorID() {
        return this.authorID;
    }

    setAuthorID(authorID) {
        this.authorID = authorID;
    }

    getCommentContent() {
        return this.commentContent;
    }

    setCommentContent(commentContent) {
        this.commentContent = commentContent;
    }

    getCommentRating() {
        return this.commentRating;
    }

    setCommentRating(commentRating) {
        this.commentRating = commentRating;
    }

}