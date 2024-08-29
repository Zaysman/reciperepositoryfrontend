class NutritionInfo {
    constructor(
      nutritionID = -1,
      recipeID = -1,
      calories = 0,
      satFat = 0,
      transFat = 0,
      cholesterol = 0,
      sodium = 0,
      carbs = 0,
      protein = 0,
      vitaminA = 0,
      vitaminC = 0,
      vitaminD = 0,
      calcium = 0,
      iron = 0,
      potassium = 0
    ) {
      this.nutritionID = nutritionID;
      this.recipeID = recipeID;
      this.calories = calories;
      this.satFat = satFat;
      this.transFat = transFat;
      this.cholesterol = cholesterol;
      this.sodium = sodium;
      this.carbs = carbs;
      this.protein = protein;
      this.vitaminA = vitaminA;
      this.vitaminC = vitaminC;
      this.vitaminD = vitaminD;
      this.calcium = calcium;
      this.iron = iron;
      this.potassium = potassium;
    }
  
    getNutritionID() {
      return this.nutritionID;
    }
  
    setNutritionID(nutritionID) {
      this.nutritionID = nutritionID;
    }
  
    getRecipeID() {
      return this.recipeID;
    }
  
    setRecipeID(recipeID) {
      this.recipeID = recipeID;
    }
  
    getCalories() {
      return this.calories;
    }
  
    setCalories(calories) {
      this.calories = calories;
    }
  
    getSatFat() {
      return this.satFat;
    }
  
    setSatFat(satFat) {
      this.satFat = satFat;
    }
  
    getTransFat() {
      return this.transFat;
    }
  
    setTransFat(transFat) {
      this.transFat = transFat;
    }
  
    getCholesterol() {
      return this.cholesterol;
    }
  
    setCholesterol(cholesterol) {
      this.cholesterol = cholesterol;
    }
  
    getSodium() {
      return this.sodium;
    }
  
    setSodium(sodium) {
      this.sodium = sodium;
    }
  
    getCarbs() {
      return this.carbs;
    }
  
    setCarbs(carbs) {
      this.carbs = carbs;
    }
  
    getProtein() {
      return this.protein;
    }
  
    setProtein(protein) {
      this.protein = protein;
    }
  
    getVitaminA() {
      return this.vitaminA;
    }
  
    setVitaminA(vitaminA) {
      this.vitaminA = vitaminA;
    }
  
    getVitaminC() {
      return this.vitaminC;
    }
  
    setVitaminC(vitaminC) {
      this.vitaminC = vitaminC;
    }
  
    getVitaminD() {
      return this.vitaminD;
    }
  
    setVitaminD(vitaminD) {
      this.vitaminD = vitaminD;
    }
  
    getCalcium() {
      return this.calcium;
    }
  
    setCalcium(calcium) {
      this.calcium = calcium;
    }
  
    getIron() {
      return this.iron;
    }
  
    setIron(iron) {
      this.iron = iron;
    }
  
    getPotassium() {
      return this.potassium;
    }
  
    setPotassium(potassium) {
      this.potassium = potassium;
    }
  
  }

  export default NutritionInfo;