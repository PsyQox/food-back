const {Tbl_recipe, Tbl_diet} = require('../db')

const postCreateRecipte = async (recipe)=>{ 
    const {title,image,summary,healthscore,steptostep,diet} = recipe
    if (!title || !image || !summary || !healthscore || !steptostep || !diet) throw new Error("Missing data")

    const recipeCreate = await Tbl_recipe.findOrCreate({where: {title:title},defaults:{
        image:image,
        summary:summary,
        healthScore: healthscore,
        steptostep: steptostep,
    }})

    for(const dietId of diet) {
        const findDiet = await Tbl_diet.findOne({where:{id:dietId}})
        await recipeCreate[0].addTbl_diet(findDiet) 
    } 
    
    return recipeCreate
} 

module.exports = postCreateRecipte