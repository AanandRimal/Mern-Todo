const Priority = require('./PriorityModel');
const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://aanandrimalo:aanand@cluster0.ydd53lz.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Once connected, perform the priority seeding
mongoose.connection.once('open', async () => {
  try {
    // Define the priority data
    const prioritiesData = [
      { name: 'High' },
      { name: 'Medium' },
      { name: 'Low' },
    ];

    // Insert the priorities into the database
    const priorities = await Priority.insertMany(prioritiesData);
  } catch (error) {
    console.error('Error seeding priorities:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
});
