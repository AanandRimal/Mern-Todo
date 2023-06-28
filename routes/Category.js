const express = require('express');
const router = express.Router();
const Category = require('../models/CategoryModel');
const mongoose=require('mongoose')

// Fetch all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});
router.get('/categories/:id', async (req, res) => {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'No such category'})
          }
        const categories = await Category.findById(id);
        if(!categories){
            return res.status(404).json({error: 'No such Cata'})
        }
    
    
        res.status(200).json(categories)
    });
module.exports = router
