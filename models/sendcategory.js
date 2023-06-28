const Category = require('./CategoryModel');
const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://aanandrimalo:aanand@cluster0.ydd53lz.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Once connected, perform the category seeding
mongoose.connection.once('open', async () => {
  try {
    // Define the category data
    const categoriesData = [
      { name: 'Work' },
      { name: 'Personal' },
      { name: 'Shopping' },
      { name: 'Health' },
      { name: 'Fitness' },
      { name: 'Education' },
      { name: 'Family' },
      { name: 'Finance' },
      { name: 'Travel' },
      { name: 'Hobbies' },
    ];

    // Insert the categories into the database
    const categories = await Category.insertMany(categoriesData);

    console.log('Categories seeded successfully:', categories);
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
});
