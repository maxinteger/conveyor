import { config } from "../gameConfig.js";
import { Chocolate } from "./chocolate.js";
import { fromEventOnce } from "./utils.js";

const testBtn = document.getElementById("testBtn");
/** @type HTMLVideoElement */
const video = document.createElement("video");
/** @type HTMLCanvasElement */
const canvas = document.getElementById("main-canvas");
/** @type CanvasRenderingContext2D */
const ctx = canvas.getContext("2d");

const assets = {};

let lastTime = performance.now();
let chocolateList = [];

testBtn?.addEventListener("click", () => {
  chocolateList.forEach((chocolate) => {
    chocolate.select();
  });
});

function startSendingChocolates(time = lastTime) {
  const timeDiff = time - lastTime;
  lastTime = time;

  // render videos
  const screenHeight = window.innerHeight;
  const screenWidth1_3 = window.innerWidth / 3;

  ctx.drawImage(video, screenWidth1_3 * 0, 0, screenWidth1_3, screenHeight);
  ctx.drawImage(video, screenWidth1_3 * 1, 0, screenWidth1_3, screenHeight);
  ctx.drawImage(video, screenWidth1_3 * 2, 0, screenWidth1_3, screenHeight);

  // remove items
  chocolateList = chocolateList.filter((c) => c.isAlive);
  // create items
  const timeToNextItem = Math.floor(time / 100) % 10 === 0;
  if (chocolateList.length < config.maxItems && timeToNextItem) {
    chocolateList.push(new Chocolate(ctx, assets));
  }
  // update and render
  chocolateList.forEach((c) => {
    c.update(timeDiff);
    c.render(timeDiff);
  });

  setTimeout(
    () => requestAnimationFrame(startSendingChocolates),
    1000 / config.fsp
  );
}

async function init() {
  video.muted = true;
  video.loop = true;
  video.src = "/video/test.mp4";
  video.play();

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const small = new Image();
  const big = new Image();
  small.src = "/images/cho2.png";
  big.src = "/images/cho3.png";
  await Promise.all([fromEventOnce(small, "load"), fromEventOnce(big, "load")]);
  assets.small = small;
  assets.big = big;

  startSendingChocolates();
}

init();
