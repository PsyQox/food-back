const {Router}=require('express')
const getRecipeId = require('../controllers/getRecipeId')
const getRecipeQuery = require('../controllers/getRecipeQuery')
const postCreateRecipte = require('../controllers/postCreateRecipe')

const recipeRouter = Router() 

recipeRouter.get("/:id",async (req,res)=>{
    try {
         const {id} = req.params;
         const recipe = await getRecipeId(id)
         return res.status(200).json(recipe)
    } catch (error) {
        return res.status(404).json(error.message)
    }
})

recipeRouter.get("/", async (req,res)=>{
    try {
        const {name} = req.query
        const recipes = await getRecipeQuery(name)
        return res.status(200).json(recipes)    
    } catch (error) {
        return res.status(404).json(error.message)
    }
})

recipeRouter.post("/", async (req,res)=>{
    try {
        const {title,image,summary,healthscore,steptostep,diet} = req.body
        const recipes  = await postCreateRecipte({title,image,summary,healthscore,steptostep,diet})
        res.status(201).json(recipes)
    } catch (error) {
        res.status(403).json(error.message)
    }
})

module.exports=recipeRouter