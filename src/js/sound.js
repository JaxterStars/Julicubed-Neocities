document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("a, .example-selector").forEach((el) => {
    el.addEventListener("mouseover", () => { // or "mouseover" for hover
      playSound("mySound");
    });
});
});

function playSound(soundName) {
  const audio = document.querySelector("#" + soundName);
  if (!audio) return;

  audio.muted = false;
  audio.volume = 1; // change volume here, e.g. 0.5

  if (audio.readyState < 4 || !audio.duration) {
    audio.load();
    audio.addEventListener(
      "canplaythrough",
      () => {
        audio
          .play()
          .catch((err) =>
            console.error("Playback of " + soundName + " failed:", err),
          );
      },
      { once: true },
    );
  } else {
    audio
      .play()
      .catch((err) =>
        console.error("Playback of " + soundName + " failed:", err),
      );
  }
}