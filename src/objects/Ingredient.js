
class Ingredient {

    constructor(entryID, name, unit, quantity, recipeID) {
        this.entryID = entryID;
        this.name = name;
        this.unit = unit;
        this.quantity = quantity;
        this.recipeID = recipeID;
    }

    getEntryID() {
        return this.entryID;
    }

    setEntryID(entryID) {
        this.entryID = entryID;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getUnit() {
        return this.unit;
    }

    setUnit(unit) {
        this.unit = unit;
    }

    getQuantity() {
        return this.quantity;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
    }

    getRecipeID() {
        return this.recipeID;
    }

    setRecipeID(recipeID) {
        this.recipeID = recipeID;
    }

    

}