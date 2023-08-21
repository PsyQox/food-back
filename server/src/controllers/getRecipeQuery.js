require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const {Tbl_recipe,Tbl_diet} = require('../db')
const {Op} = require('sequelize')

const getRecipeQuery = async (name)=>{
    if (!name){
        const {data} = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
        const recipeDB = await Tbl_recipe.findAll({include: Tbl_diet})

        return [...data.results,...recipeDB]
    }else{
        const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}&addRecipeInformation=true`)
        const recipeDB = await Tbl_recipe.findAll({where:{
            title: {
            [Op.iLike]: `%${name}%`
        }
    },include: Tbl_diet})
        
        return [...recipes.data.results, ...recipeDB]
    }
}

module.exports = getRecipeQuery