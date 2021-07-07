const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch?apiKey="
const TYPE_URL = "&addRecipeInformation=true"
const ID_URL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=`

module.exports = {
    BASE_URL,
    TYPE_URL,
    ID_URL
};