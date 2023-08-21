require('dotenv').config()
const {API_KEY} = process.env
const axios = require('axios')
const {Tbl_diet} = require('../db')

const getDiet = async ()=>{
    const dietBD = await Tbl_diet.findAll()
    
    if (dietBD.length <= 0) {
        const diets = new Set()
        const {data} = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)

        data.results.forEach(recipe =>{
            recipe.diets.forEach((diet) =>{
                 diets.add(diet)
            })
            
        })
        
        const arrayDiets = Array.from(diets)

        arrayDiets.forEach(async (diet) => {
            await Tbl_diet.findOrCreate({where:{name:diet}})
        })

        return await Tbl_diet.findAll()
    }
    return dietBD
} 

module.exports = getDiet