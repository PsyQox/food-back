const {Router} = require('express')
const getDiet = require('../controllers/getDiet')

const dietRouter = Router()

dietRouter.get("/", async (req,res) =>{
    try {
        const diets = await getDiet()
        res.status(200).json(diets)
    } catch (error) {
        res.status(500).json(error.message)
    }
    
})

module.exports = dietRouter