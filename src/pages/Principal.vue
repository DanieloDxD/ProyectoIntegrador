<template>
    <div class="video-container">
      <h2>Importancia de Cuidar la Calidad del Aire</h2>
      <div id="player" class="video-player"></div>
    </div>
</template>
  
<script setup>
import { onMounted } from 'vue';

let player;

const loadYouTubeAPI = () => {
  let tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  let firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = createPlayer;
};

const createPlayer = () => {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'poAPG-Ek_6E',
    playerVars: { playsinline: 1 }
  });
};

onMounted(() => {
  loadYouTubeAPI();
});
</script>


<style scoped>
.video-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(to bottom, #4facfe, #00f2fe);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

h2 {
  color: white;
  font-size: 24px;
  margin-bottom: 15px;
}

.video-player {
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16/9;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
</style>
  