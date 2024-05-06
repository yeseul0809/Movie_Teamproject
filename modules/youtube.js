let player;
function onYouTubeIframeAPIReady(videoId) {
  player = new YT.Player('player', {
    height: '490',
    width: '880',
    videoId: videoId,
    playerVars: {
      autoplay: 1,
      mute: 0,
      controls: 0,
    },
  });
}

export function stopVideo() {
  if (player) {
    player.stopVideo();
  }
}

export function changeVideo(videoId) {
  if (player) {
    player.stopVideo();
    player.loadVideoById(videoId);
  } else {
    onYouTubeIframeAPIReady(videoId);
  }
}
