

class Step {

    constructor(stepID, stepNum, recipeID, stepDesc, stepNote) {
        this.stepID = stepID;
        this.stepNum = stepNum;
        this.recipeID = recipeID;
        this.stepDesc = stepDesc;
        this.stepNote = stepNote;
    }

    getStepID() {
        return this.stepID;
    }
    
    setStepID(stepID) {
        this.stepID = stepID;
    }

    getStepNum() {
        return this.stepNum;
    }

    setStepNum(stepNum) {
        this.stepNum = stepNum;
    }

    getRecipeID() {
        return this.recipeID;
    }

    setRecipeID(recipeID) {
        this.recipeID = recipeID;
    }

    getStepDesc() {
        return this.stepDesc;
    }

    setStepDesc(stepDesc) {
        this.stepDesc = stepDesc;
    }

    getStepNote() {
        return this.stepNote;
    }

    setStepNote(stepNote) {
        this.stepNote = stepNote;
    }

}