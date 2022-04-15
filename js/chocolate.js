import { config } from "../gameConfig";
import { rndIntBetween } from "./utils.js";

export class Chocolate {
  constructor(chocolateContainer) {
    const bigOrSmall = rndIntBetween(1, 100) > config.smallChocolateChance;
    this.el = document.createElement("div");
    // position in percentage
    this.x = 0;
    this.y = rndIntBetween(3, 7) * 10;
    this.vx =
      100 /
      rndIntBetween(
        config.travellingSpeedThroughScreen * 0.95,
        config.travellingSpeedThroughScreen * 1.05
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
