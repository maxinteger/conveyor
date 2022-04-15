import { config } from "../gameConfig.js";
import { fromEventOnce } from "./utils.js";
import { Chocolate } from "./chocolate.js";

const testBtn = document.getElementById("testBtn");
const videos = Array.from(document.getElementsByTagName("video"));
const chocolateContainer = document.getElementById("chocolate-container");

let lastTime = performance.now();
let chocolateList = [];
function startSendingChocolates(time = lastTime) {
  const timeDiff = time - lastTime;
  lastTime = time;

  // remove items
  chocolateList = chocolateList.filter((c) => c.isAlive);
  // create items
  const timeToNextItem = Math.floor(time / 100) % 20 === 0;
  if (chocolateList.length < config.maxItems && timeToNextItem) {
    chocolateList.push(new Chocolate(chocolateContainer));
  }
  // update and render
  chocolateList.forEach((c) => {
    c.update(timeDiff);
    c.render();
  });
  requestAnimationFrame(startSendingChocolates);
}

function startVideo() {
  videos.forEach((el) => {
    el.currentTime = 0;
    el.play();
  });
}

testBtn?.addEventListener("click", () => {
  chocolateList.forEach((chocolate) => {
    chocolate.select();
  });
});

// Start only when all player are ready for playback
Promise.all(videos.map((el) => fromEventOnce(el, "canplay"))).then(startVideo);

// Synchronised loop
videos[0]?.addEventListener("ended", () => {
  startVideo();
});

startSendingChocolates();
