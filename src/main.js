const playbackUrl = "";
const videoPlayer = document.getElementById("video-player");

(function (IVSPlayer) {
  const PlayerState = IVSPlayer.PlayerState;
  const PlayerEventType = IVSPlayer.PlayerEventType;

  // Initialize player
  const player = IVSPlayer.create();
  player.attachHTMLVideoElement(videoPlayer);

  // Attach event listeners
  player.addEventListener(PlayerState.PLAYING, function () {
    console.log("State: PLAYING");
  });
  player.addEventListener(PlayerState.ENDED, function () {
    console.log("State: ENDED");
  });
  player.addEventListener(PlayerState.READY, function () {
    console.log("State: READY");
  });
  player.addEventListener(PlayerEventType.ERROR, function (err) {
    console.warn("State: ERROR:", err);
  });

  player.addEventListener(PlayerEventType.TEXT_METADATA_CUE, function (cue) {
    const metadataText = cue.text;
    console.log(
      `PlayerEvent - METADATA: "${metadataText}"`
    );
  });

  // Setup stream and play
  player.setAutoplay(true);
  player.load(playbackUrl);

  // Setvolume
  player.setVolume(0.1);

})(window.IVSPlayer);
