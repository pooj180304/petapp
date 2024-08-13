const mongoose = require('mongoose');
const Product = require('./models/Product');  // Adjust the path based on your project structure

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pet-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seed data
const products = [
  { name: 'Dog Food', price: 10, quantity: 20, image: 'dog_food.jpg', category: 'dogs', description: 'High-quality food for dogs.', tags: ['food', 'dogs'] },
  { name: 'Dog Toy', price: 5, quantity: 15, image: 'dog_toy.jpg', category: 'dogs', description: 'Fun toy for dogs to play with.', tags: ['toy', 'dogs'] },
  { name: 'Dog Leash', price: 12, quantity: 10, image: 'dog_leash.jpg', category: 'dogs', description: 'Durable leash for walking dogs.', tags: ['leash', 'dogs'] },
  { name: 'Dog Bed', price: 40, quantity: 8, image: 'dog_bed.jpg', category: 'dogs', description: 'Comfortable bed for dogs.', tags: ['bed', 'dogs'] },
  { name: 'Cat Food', price: 8, quantity: 30, image: 'cat_food.jpg', category: 'cats', description: 'Nutritional food for cats.', tags: ['food', 'cats'] },
  { name: 'Cat Toy', price: 6, quantity: 20, image: 'cat_toy.jpg', category: 'cats', description: 'Interactive toy for cats.', tags: ['toy', 'cats'] },
  { name: 'Cat Litter', price: 10, quantity: 15, image: 'cat_litter.jpg', category: 'cats', description: 'High absorbent litter for cats.', tags: ['litter', 'cats'] },
  { name: 'Bird Seed', price: 7, quantity: 25, image: 'bird_seed.jpg', category: 'birds', description: 'Nutritious seed mix for birds.', tags: ['seed', 'birds'] },
  { name: 'Bird Cage', price: 30, quantity: 5, image: 'bird_cage.jpg', category: 'birds', description: 'Spacious cage for birds.', tags: ['cage', 'birds'] },
  { name: 'Fish Food', price: 5, quantity: 50, image: 'fish_food.jpg', category: 'fish', description: 'Specially formulated food for fish.', tags: ['food', 'fish'] },
  { name: 'Fish Tank', price: 100, quantity: 2, image: 'fish_tank.jpg', category: 'fish', description: 'Aquarium tank for fish.', tags: ['tank', 'fish'] },
  { name: 'Reptile Food', price: 10, quantity: 15, image: 'reptile_food.jpg', category: 'reptiles', description: 'Nutritional food for reptiles.', tags: ['food', 'reptiles'] },
  { name: 'Reptile Tank', price: 80, quantity: 3, image: 'reptile_tank.jpg', category: 'reptiles', description: 'Tank for reptiles with habitat features.', tags: ['tank', 'reptiles'] },
  { name: 'Small Pet Food', price: 8, quantity: 25, image: 'small_pet_food.jpg', category: 'small_pets', description: 'Balanced diet for small pets.', tags: ['food', 'small_pets'] },
  { name: 'Small Pet Cage', price: 60, quantity: 5, image: 'small_pet_cage.jpg', category: 'small_pets', description: 'Cage for small pets with ample space.', tags: ['cage', 'small_pets'] },
];

// Insert data into the database
Product.insertMany(products)
  .then(() => {
    console.log('Products added successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error adding products:', err);
  });
