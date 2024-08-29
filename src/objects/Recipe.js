class Recipe {
    constructor(recipeID, servSize, difflvl, authorID, nutritionInfoID, rating, recipeTitle, recipeDesc, cuisineType, prepTime, cookTime, totalTime, nutritionInfo, ingredients, prepSteps, comments) {
        this.recipeID = recipeID;
        this.servSize = servSize;
        this.difflvl = difflvl;
        this.authorID = authorID;
        this.nutritionInfoID = nutritionInfoID;
        this.rating = rating;
        this.recipeTitle = recipeTitle;
        this.recipeDesc = recipeDesc;
        this.cuisineType = cuisineType;
        this.prepTime = prepTime;
        this.cookTime = cookTime;
        this.totalTime = totalTime;
        this.nutritionInfo = nutritionInfo;
        this.ingredients = ingredients || [];
        this.prepSteps = prepSteps || [];
        this.comments = comments || [];
    }

    get recipeID() {
        return this._recipeID;
    }

    set recipeID(value) {
        this._recipeID = value;
    }

    get servSize() {
        return this._servSize;
    }

    set servSize(value) {
        this._servSize = value;
    }

    get difflvl() {
        return this._difflvl;
    }

    set difflvl(value) {
        this._difflvl = value;
    }

    get authorID() {
        return this._authorID;
    }

    set authorID(value) {
        this._authorID = value;
    }

    get nutritionInfoID() {
        return this._nutritionInfoID;
    }

    set nutritionInfoID(value) {
        this._nutritionInfoID = value;
    }

    get rating() {
        return this._rating;
    }

    set rating(value) {
        this._rating = value;
    }

    get recipeTitle() {
        return this._recipeTitle;
    }

    set recipeTitle(value) {
        this._recipeTitle = value;
    }

    get recipeDesc() {
        return this._recipeDesc;
    }

    set recipeDesc(value) {
        this._recipeDesc = value;
    }

    get cuisineType() {
        return this._cuisineType;
    }

    set cuisineType(value) {
        this._cuisineType = value;
    }

    get prepTime() {
        return this._prepTime;
    }

    set prepTime(value) {
        this._prepTime = value;
    }

    get cookTime() {
        return this._cookTime;
    }

    set cookTime(value) {
        this._cookTime = value;
    }

    get totalTime() {
        return this._totalTime;
    }

    set totalTime(value) {
        this._totalTime = value;
    }

    get nutritionInfo() {
        return this._nutritionInfo;
    }

    set nutritionInfo(value) {
        this._nutritionInfo = value;
    }

    get ingredients() {
        return this._ingredients;
    }

    set ingredients(value) {
        this._ingredients = value;
    }

    get prepSteps() {
        return this._prepSteps;
    }

    set prepSteps(value) {
        this._prepSteps = value;
    }

    get comments() {
        return this._comments;
    }

    set comments(value) {
        this._comments = value;
    }

    addIngredient(ingredient) {
        this._ingredients.push(ingredient);
    }

    addPrepStep(step) {
        this._prepSteps.push(step);
    }

    addComment(comment) {
        this._comments.push(comment);
    }

    removeComment(index) {
        this._comments.splice(index, 1);
    }
}

export default Recipe;
