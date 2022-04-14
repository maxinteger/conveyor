import { config } from "../gameConfig.js";
import { fromEventOnce } from "./utils.js";

const testBtn = document.getElementById("testBtn");
const videos = Array.from(document.getElementsByTagName("video"));
const chocolateContainer = document.getElementById("chocolate-container");

const rndIntBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

class Chocolate {
  constructor(chocolateContainer) {
    const bigOrSmall = rndIntBetween(1, 100) > config.smallChocolateChance;
    this.el = document.createElement("div");
    // position in percentage
    this.x = 0;
    this.y = rndIntBetween(3, 7) * 10;
    this.vx =
      100 /
      rndIntBetween(
        config.travellingSpeedThroughScreen * 0.9,
        config.travellingSpeedThroughScreen * 1.1
      );
    this.vy = 100 / 2000; /*ms*/
    this.type = bigOrSmall ? "big" : "small";
    this.isAlive = true;
    this.isSelected = false;

    this.el.classList.add("chocolate", this.type);
    this.container = chocolateContainer;
    this.container.appendChild(this.el);
  }

  select() {
    if (this.x > 30 && this.x <= 60 && this.type === "small") {
      this.isSelected = true;
    }
  }

  update(timeDiff) {
    if (!this.isSelected) {
      this.x += this.vx * timeDiff;
    } else {
      this.y += this.vy * timeDiff;
    }
    // fix: out fo screen check
    if (this.x > 110 || this.y >= 100) {
      this.isAlive = false;
      this.container.removeChild(this.el);
    }
  }

  render() {
    if (this.isAlive) {
      const x = ((100 - this.x) / 100) * window.innerWidth;
      const y = (this.y / 100) * window.innerHeight;
      this.el.style.transform = `translate(${x}px, ${y}px)`;
    }
  }
}

let lastTime = performance.now();
let chocolateList = [];
function startSendingChocolates(time = lastTime) {
  const timeDiff = time - lastTime;
  lastTime = time;

  // remove items
  chocolateList = chocolateList.filter((c) => c.isAlive);
  // create items
  if (chocolateList.length < config.maxItems) {
    const numOfNewItem = rndIntBetween(1, Math.floor(config.maxItems / 3));
    for (let i = 0; i < numOfNewItem; i++) {
      chocolateList.push(new Chocolate(chocolateContainer));
    }
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
