// priorityHelper.js

const Priority = require('../models/PriorityModel'); // Import the Priority model if needed

const fetchPriorityId = async (priorityName) => {
  try {
    const priority = await Priority.findOne({ name: priorityName });
    if (priority) {
      return priority._id;
    }
    return null; // If priority is not found
  } catch (error) {
    console.error('Error fetching priority:', error);
    throw error;
  }
};

module.exports = fetchPriorityId;
