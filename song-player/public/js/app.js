// public/js/app.js
document.addEventListener('DOMContentLoaded', async () => {
  const audio = document.getElementById('audio');
  const nowPlaying = document.getElementById('now-playing');
  const songList = document.getElementById('song-list');
  
  // Load songs from the API
  async function loadSongs() {
    try {
      const response = await fetch('/api/songs');
      const songs = await response.json();
      
      songList.innerHTML = songs.map(song => `
        <div class="song-card p-4 border rounded-lg cursor-pointer hover:bg-gray-100" 
             data-file="${song.filePath}">
          <h3 class="font-bold">${song.title}</h3>
          <p class="text-gray-600">${song.artist}</p>
        </div>
      `).join('');
      
      // Add click event to play songs
      document.querySelectorAll('.song-card').forEach(card => {
        card.addEventListener('click', () => {
          const filePath = card.getAttribute('data-file');
          audio.src = `/songs/${filePath}`;
          audio.play();
          nowPlaying.innerHTML = `Now Playing: ${card.querySelector('h3').textContent}`;
        });
      });
    } catch (error) {
      console.error('Error loading songs:', error);
    }
  }
  
  // Initial load
  loadSongs();
});