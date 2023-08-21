require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const {Tbl_recipe, Tbl_diet} = require('../db')

const getRecipeId = async (id)=>{ 
    if(!id) throw new Error("You did not send the ID")
    // Expresion regular del uuid 
    const regexUUID = RegExp(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/)

    if (regexUUID.test(id)) {
        const recipe = await Tbl_recipe.findOne({where:{id:id},include: Tbl_diet})
        return recipe
    }else{
        const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        return recipe.data  
    }
}

module.exports=getRecipeId