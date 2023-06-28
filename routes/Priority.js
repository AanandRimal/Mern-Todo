
const express = require('express');
const router = express.Router();
const Priority = require('../models/PriorityModel');
const mongoose=require('mongoose');

// Fetch all categories
router.get('/priorities', async (req, res) => {
  try {
    const priorities = await Priority.find();
    res.json(priorities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch priorities' });
  }
});
router.get('/priorities/:id', async (req, res) => {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'No such priority'})
          }
        const priorities = await Priority.findById(id);
        if(!priorities){
            return res.status(404).json({error: 'No such Cata'})
        }
    
    
        res.status(200).json(priorities)
    });
module.exports = router
