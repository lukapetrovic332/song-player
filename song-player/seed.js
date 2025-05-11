// seed.js
const sequelize = require('./db');
const Song = require('./song');

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true }); // This will recreate tables
    
    await Song.bulkCreate([
      {
        title: 'Sample Song 1',
        artist: 'Artist A',
        filePath: 'song1.mp3',
        duration: 180,
        coverArt: 'cover1.jpg'
      },
      {
        title: 'Sample Song 2',
        artist: 'Artist B',
        filePath: 'song2.mp3',
        duration: 210,
        coverArt: 'cover2.jpg'
      }
    ]);
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();